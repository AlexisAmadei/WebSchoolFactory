import { useEffect, useState } from 'react';
import './App.css';
import SearchField from './components/SearchField';
import PokemonList from './components/PokemonList';

function App() {
  const [pokeSearch, setPokeSearch] = useState('');

  useEffect(() => {
    console.log('PokeSearch updated:', pokeSearch);
  }, [pokeSearch]);

  return (
    <div className='app-wrapper'>
      <h1>My PokeAPI</h1>
      <SearchField setPokeSearch={setPokeSearch} />
      <PokemonList pokeSearch={pokeSearch} />
    </div>
  );
}

export default App;