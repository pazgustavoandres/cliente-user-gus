import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      nombre: "Gorro Elegante para Dachshund",
      precio: 29.99,
      imagen: "/images/gorro-dachshund.jpg",
      categoria: "Accesorios",
      descripcion: "Gorro de lana suave especialmente diseñado para perros salchichas",
      vendedor: {
        nombre: "Pet Elegance",
        calificacion: 4.9
      }
    },
    {
      id: 2,
      nombre: "Collar de Perlas para Poodle",
      precio: 39.99,
      imagen: "/images/collar-poodle.jpg",
      categoria: "Accesorios",
      descripcion: "Collar elegante con perlas para poodles",
      vendedor: {
        nombre: "Pet Elegance",
        calificacion: 4.8
      }
    },
    {
      id: 3,
      nombre: "Comida Premium Dachshund",
      precio: 49.99,
      imagen: "/images/comida-dachshund.jpg",
      categoria: "Alimentos",
      descripcion: "Alimento especial para perros salchichas",
      vendedor: {
        nombre: "Pet Nutrition",
        calificacion: 4.7
      }
    },
    {
      id: 4,
      nombre: "Abrigo Elegante Poodle",
      precio: 59.99,
      imagen: "/images/abrigo-poodle.jpg",
      categoria: "Ropa",
      descripcion: "Abrigo de invierno para poodles",
      vendedor: {
        nombre: "Pet Fashion",
        calificacion: 4.9
      }
    }
  ]);

  const [categories, setCategories] = useState([
    "Accesorios",
    "Alimentos",
    "Ropa",
    "Juguetes",
    "Cuidado",
    "Transporte"
  ]);

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Todas" || product.categoria === selectedCategory;
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">Pet Elegance Boutique</h1>
        <p className="text-xl mb-6">Productos exclusivos para tus adorables Dachshunds y Poodles</p>
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-3 rounded-lg text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categorías */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Categorías</h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              selectedCategory === "Todas"
                ? "bg-pink-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory("Todas")}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-pink-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Productos Destacados */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Productos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              to={`/producto/${product.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.imagen}
                  alt={product.nombre}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.nombre}
                </h3>
                <p className="text-xl font-bold text-pink-500 mb-2">
                  ${product.precio.toFixed(2)}
                </p>
                <p className="text-gray-600 text-sm mb-4">{product.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {product.categoria}
                  </span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.vendedor.calificacion)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Sección de Vendedores Destacados */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Nuestros Proveedores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.vendedor.nombre}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.vendedor.nombre}
              </h3>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.vendedor.calificacion)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">
                  ({product.vendedor.calificacion})
                </span>
              </div>
              <button className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300">
                Ver Catálogo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage; 