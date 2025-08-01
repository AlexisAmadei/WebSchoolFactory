import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RightSideBar from '../components/RightSideBar';
import LeftSideBar from '../components/LeftSideBar';
import HomeLayout from './HomeLayout';
import Accueil from '../pages/Accueil';
import Objectifs from '../pages/Objectifs';

import './DashboardLayout.css';

export default function DashboardLayout() {
    return (
        <div className="dash-main-app">
            <LeftSideBar />
            <div className='main'>
                <Routes>
                    <Route element={<HomeLayout />}>
                        <Route path='/' element={<Accueil />} />
                        <Route path='/objectifs' element={<Objectifs />} />
                        <Route path='/engagements' element={<Accueil />} />
                    </Route>
                </Routes>
            </div>
            <RightSideBar />
        </div>
    )
}