import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import DefaultLayout from './Layouts/DefaultLayout.jsx'
import PokemonDetails from './views/PokemonDetails.jsx'
import Teams from './views/Teams.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<App />} />
          <Route path='pokemon/:name' element={<PokemonDetails />} />
          <Route path='teams' element={<Teams />} />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
