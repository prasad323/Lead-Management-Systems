import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Leads />} />
        <Route path="/lead/:id" element={<LeadDetail />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;