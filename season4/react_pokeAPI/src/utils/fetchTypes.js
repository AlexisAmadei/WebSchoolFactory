export async function getTypeIconFromApi(typeName) {
    try {
        const typeRes = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
        if (!typeRes.ok) throw new Error('Type not found');
        const typeData = await typeRes.json();

        // Sword/Shield sprite
        return typeData.sprites?.['generation-viii']?.['sword-shield']?.name_icon || null;
    } catch (error) {
        console.error(`Failed to fetch type icon for ${typeName}`, error);
        return null;
    }
};
