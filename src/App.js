import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EntryPage from './components/EntryPage';
import HomePage from './components/HomePage'; // Example for homepage component

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/" element={<EntryPage />} />
      </Routes>
    </Router>
  );
};

export default App;