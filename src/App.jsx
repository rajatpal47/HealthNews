// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import HealthNews from './pages/HealthNews';
import BookmarkedArticles from './pages/BookmarkedArticles';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<HealthNews />} />
          <Route path="/bookmarks" element={<BookmarkedArticles />} />
          <Route path="/about" element={<About/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
