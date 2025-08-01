import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Accueil from '../pages/Accueil';
import Objectifs from '../pages/Objectifs';
import Engagements from '../pages/Engagements';

export default function HomeLayout() {
    return (
        <div className="home-main-app">
            <Header />
            <Navbar />
            <Routes>
                <Route path='/' element={<Accueil />} />
                <Route path='/objectifs' element={<Objectifs />} />
                <Route path='/engagements' element={<Engagements />} />
            </Routes>
        </div>
    )
}