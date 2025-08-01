import React, { useEffect, useState } from 'react';
import { Box, Flex, Text, Button } from '@radix-ui/themes';
import RadarChart from '../components/RadarChart';

export default function Team() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URL = 'http://localhost:3001/team';

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error('Failed to fetch team');
                const data = await res.json();
                setTeam(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    const removePokemon = async (id) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to remove Pokémon');
            setTeam(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const getAverageStats = () => {
        if (team.length === 0) return [];

        const statSums = Array(6).fill(0);
        team.forEach(p => {
            p.stats.forEach((s, i) => {
                statSums[i] += s.base_stat;
            });
        });

        return statSums.map((total, i) => ({
            base_stat: Math.round(total / team.length),
            stat: { name: team[0].stats[i].stat.name }
        }));
    };

    if (loading) return <Text>Loading team...</Text>;
    if (error) return <Text color="red">{error}</Text>;

    return (
        <Box p="4">
            <Text as="h2" size="5" weight="bold" mb="4">My Pokémon Team</Text>

            {team.length === 0 ? (
                <Text>No Pokémon in your team yet.</Text>
            ) : (
                <>
                    <Flex gap="3" wrap="wrap" mb="4">
                        {team.map(p => (
                            <Box
                                key={p.id}
                                p="2"
                                style={{
                                    border: '1px solid #ccc',
                                    borderRadius: '8px',
                                    textAlign: 'center',
                                    width: '100px'
                                }}
                            >
                                <img
                                    src={p.sprites.front_default}
                                    alt={p.name}
                                    style={{ width: 72, height: 72 }}
                                />
                                <Text size="2">{p.name}</Text>
                                <Button
                                    variant="ghost"
                                    size="1"
                                    onClick={() => removePokemon(p.id)}
                                >
                                    Remove
                                </Button>
                            </Box>
                        ))}
                    </Flex>

                    <Box mt="4">
                        <Text size="4" weight="bold" mb="2">Average Stats</Text>
                        <RadarChart stats={getAverageStats()} />
                    </Box>
                </>
            )}
        </Box>
    );
}
