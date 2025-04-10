import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo y menú hamburguesa */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mr-4 text-gray-600 hover:text-pink-500 transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/" className="flex items-center">
              <img src="/images/logo.png" alt="Pet Elegance Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900">Pet Elegance</span>
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar productos para tu mascota..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors duration-300">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Botones de login/registro */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-600 hover:text-pink-500 font-medium transition-colors duration-300"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-medium transition-colors duration-300"
            >
              Registrarse
            </Link>
          </div>
        </div>

        {/* Menú desplegable */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-2">
              <Link to="/categorias" className="px-4 py-2 text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-lg transition-colors duration-300">
                Categorías
              </Link>
              <Link to="/dachshund" className="px-4 py-2 text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-lg transition-colors duration-300">
                Dachshund
              </Link>
              <Link to="/poodle" className="px-4 py-2 text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-lg transition-colors duration-300">
                Poodle
              </Link>
              <Link to="/ofertas" className="px-4 py-2 text-gray-600 hover:bg-pink-50 hover:text-pink-500 rounded-lg transition-colors duration-300">
                Ofertas Especiales
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 