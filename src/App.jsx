import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ProductDetail from './components/ProductDetail';
import Ratings from './components/Ratings';
import HomePage from './components/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/calificaciones" element={<Ratings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
