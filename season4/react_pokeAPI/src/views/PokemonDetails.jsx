import { Box, Flex, Text, Heading, Card, Button } from '@radix-ui/themes';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getTypeIconFromApi } from '../utils/fetchTypes';
import PokemonTypeIcons from '../components/PokemonTypeIcon';
import RadarChart from '../components/RadarChart';

export default function PokemonDetails() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(null);
    const [typeIcons, setTypeIcons] = useState({});
    const [addMessage, setAddMessage] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                if (!response.ok) throw new Error('Pokémon not found');
                const data = await response.json();
                setPokemon(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchDetails();
    }, [name]);

    useEffect(() => {
        if (pokemon) {
            const loadIcons = async () => {
                const icons = {};
                for (const t of pokemon.types) {
                    const icon = await getTypeIconFromApi(t.type.name);
                    icons[t.type.name] = icon;
                }
                setTypeIcons(icons);
            };
            loadIcons();
        }
    }, [pokemon]);

    const handleAddToTeam = async () => {
        try {
            const res = await fetch('http://localhost:3001/team');
            const currentTeam = await res.json();

            if (currentTeam.length >= 6) {
                setAddMessage("Team is full (6 Pokémon max)");
                return;
            }

            if (currentTeam.some(p => p.name === pokemon.name)) {
                setAddMessage(`${pokemon.name} is already in your team`);
                return;
            }

            const response = await fetch('http://localhost:3001/team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pokemon)
            });

            if (!response.ok) throw new Error('Failed to add to team');

            setAddMessage(`${pokemon.name} added to your team!`);
        } catch (err) {
            setAddMessage(`Error: ${err.message}`);
        }
    };

    if (error) return <Text color="red">{error}</Text>;
    if (!pokemon) return <Text>Loading...</Text>;

    const capitalized = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <Box pt="4">
            <Flex direction="column" align="center" padding="4">
                <Heading size="6" mb="3">
                    {capitalized(pokemon.name)}
                </Heading>

                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    style={{ width: 200, height: 200 }}
                />

                <PokemonTypeIcons types={pokemon.types} />

                <Flex gap="4" mt="4" direction="row" wrap="wrap" justify="center">
                    <Card>
                        <Text weight="bold">Height:</Text>
                        <Text>{pokemon.height / 10} m</Text>
                    </Card>
                    <Card>
                        <Text weight="bold">Weight:</Text>
                        <Text>{pokemon.weight / 10} kg</Text>
                    </Card>
                </Flex>

                <Box mt="4">
                    <RadarChart stats={pokemon.stats} />
                </Box>

                <Box mt="4">
                    <Button onClick={handleAddToTeam}>Add to Team</Button>
                    {addMessage && (
                        <Text mt="2" color={addMessage.startsWith("Error") ? "red" : "green"}>
                            {addMessage}
                        </Text>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}
