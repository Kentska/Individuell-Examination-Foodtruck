import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Eta from './pages/Eta';
import Receipt from './components/ReceiptPage';


const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/eta" element={<Eta />} />
      <Route path="/receipt" element={<Receipt />} />
    </Routes>
  </Router>
);

export default App;

