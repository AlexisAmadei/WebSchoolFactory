import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './css/App.css';
import Landing from './Landing';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
