// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Animals from './components/Animals';
import Calendar from './components/Calendaar';
import Treatments from './components/Treatments';
import Reports from './components/Reports';
import Settings from './components/Settings';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/treatments" element={<Treatments/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/settings" element={<Settings/>} />
      </Routes>
    </Router>
  );
}

export default App;