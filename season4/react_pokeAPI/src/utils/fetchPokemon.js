export async function fetchAllPokemons(url = `${import.meta.env.VITE_API_URL}/pokemon?limit=20&offset=0`) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export async function fetchPokemon(pokeSearch) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/pokemon/${pokeSearch}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        throw error;
    }
}

export async function getPokeDetails(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon avatar:', error);
        return null;
    }
}
