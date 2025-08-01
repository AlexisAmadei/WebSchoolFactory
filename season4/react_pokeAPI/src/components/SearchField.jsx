import { TextField } from '@radix-ui/themes'
import { useState } from 'react';

export default function SearchField({ setPokeSearch }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setPokeSearch(searchInput);
        console.log('Search submitted:', searchInput);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField.Root
                    className="search-field"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search Pokémon..."
                />
            </form>
        </>
    )
}
