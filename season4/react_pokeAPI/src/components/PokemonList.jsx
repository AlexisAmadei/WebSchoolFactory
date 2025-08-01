import React, { useEffect, useState } from 'react';
import { fetchAllPokemons } from '../utils/fetchPokemon';
import PokemonCard from './PokemonCard';
import { Box, Flex, Button } from '@radix-ui/themes';

export default function PokemonList({ pokeSearch }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [previousPage, setPreviousPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [currentUrl, setCurrentUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`);

    const getAllPokemons = async (url) => {
        try {
            const response = await fetchAllPokemons(url);
            setPokemonList(response.results || []);
            setPreviousPage(response.previous);
            setNextPage(response.next);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    useEffect(() => {
        getAllPokemons(currentUrl);
    }, [currentUrl]);

    const handlePrevious = () => {
        if (previousPage) setCurrentUrl(previousPage);
    };

    const handleNext = () => {
        if (nextPage) setCurrentUrl(nextPage);
    };

    const searchTerm = pokeSearch?.toLowerCase();

    return (
        <Box className="pokemon-list" padding="4" pt="4">
            <Flex justify="center" gap="2" mb="4">
                <Button onClick={handlePrevious} disabled={!previousPage}>Previous</Button>
                <Button onClick={handleNext} disabled={!nextPage}>Next</Button>
            </Flex>

            {pokemonList.length > 0 ? (
                <Flex direction="row" wrap="wrap" gap="2" justify="center">
                    {pokemonList.map((pokemon) => {
                        const isMatch = searchTerm && pokemon.name.toLowerCase().includes(searchTerm);
                        return (
                            <div
                                key={pokemon.name}
                                className={isMatch ? 'highlighted' : ''}
                            >
                                <PokemonCard
                                    pokeName={pokemon.name}
                                    url={pokemon.url}
                                />
                            </div>
                        );
                    })}
                </Flex>
            ) : (
                <p>No Pokémon found.</p>
            )}
        </Box>
    );
}
