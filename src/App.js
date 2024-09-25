import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EntryPage from './components/EntryPage';
import HomePage from './components/HomePage'; // Example for homepage component
import SearchPage from './components/SearchPage';
import app from './firebase/fireBaseConfig';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="Profile" element={<EntryPage />} />
      <Route path="Search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;