import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/api/customers" element={<CustomerForm />} />
          <Route path="/api/customers/:id" element={<CustomerForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
