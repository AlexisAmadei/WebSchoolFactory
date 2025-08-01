import { Avatar, Box, Card, Flex, Text } from '@radix-ui/themes'
import { useNavigate } from 'react-router'
import { getPokeDetails } from '../utils/fetchPokemon';
import { useEffect, useState } from 'react';

export default function PokemonCard({ pokeName, url }) {
    const navigate = useNavigate();
    const [pokeDetails, setPokeDetails] = useState(null);

    const handleCardClick = () => {
        navigate(`/pokemon/${pokeName}`);
    }

    async function fetchPokeDetail(url) {
        const details = await getPokeDetails(url);
        return details;
    }

    useEffect(() => {
        if (url) {
            fetchPokeDetail(url).then(setPokeDetails);
        }
    }, [url]);

    useEffect(() => {
        if (!pokeDetails) return;
        console.log('Pokemon details fetched:', pokeDetails?.sprites);
    }, [pokeDetails]);
    return (
        <Box maxWidth={240} onClick={handleCardClick}>
            <Card>
                <Flex gap={'2'} direction={'row'} align={'center'} justify={'between'}>
                    {/* pokemon avatar*/}
                    <Avatar
                        size={'2'}
                        src={pokeDetails?.sprites?.other?.['official-artwork']?.front_default}
                        radius="full"
                        fallback="P"
                    />
                    {/* pokemon name */}
                    <Text size={'2'} weight={'bold'}>
                        {pokeName}
                    </Text>
                </Flex>
            </Card>
        </Box>
    )
}
