import React, { useEffect, useState } from 'react';

const getTypeIconFromApi = async (typeName) => {
    try {
        const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
        if (!typeRes.ok) throw new Error('Type not found');
        const typeData = await typeRes.json();

        return typeData.sprites?.['generation-viii']?.['sword-shield']?.name_icon || null;
    } catch (error) {
        console.error(`Failed to fetch type icon for ${typeName}`, error);
        return null;
    }
};

export default function PokemonTypeIcons({ types }) {
    const [icons, setIcons] = useState({});

    useEffect(() => {
        const loadIcons = async () => {
            const iconMap = {};
            for (const t of types) {
                const name = t.type.name;
                const icon = await getTypeIconFromApi(name);
                iconMap[name] = icon;
            }
            setIcons(iconMap);
        };

        loadIcons();
    }, [types]);

    return (
        <div style={{ display: 'flex', gap: 4, marginTop: '0.6rem' }}>
            {types.map((t) => {
                const name = t.type.name;
                const icon = icons[name];
                return (
                    <img
                        src={icon}
                        alt={name}
                        style={{ width: '150px', height: 'auto', display: 'block', margin: '0' }}
                    />
                );
            })}
        </div>
    );
}
