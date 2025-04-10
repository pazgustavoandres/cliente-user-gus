import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostGallery = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    categoria: '',
    raza: '',
    precioMin: '',
    precioMax: ''
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setPosts(response.data);
      } catch (err) {
        setError('Error al cargar las publicaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredPosts = posts.filter((post) => {
    if (filters.categoria && post.categoria !== filters.categoria) return false;
    if (filters.raza && post.raza !== filters.raza) return false;
    if (filters.precioMin && post.precio < parseFloat(filters.precioMin)) return false;
    if (filters.precioMax && post.precio > parseFloat(filters.precioMax)) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando publicaciones...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Galería de Productos</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  value={filters.categoria}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                >
                  <option value="">Todas</option>
                  <option value="Accesorios">Accesorios</option>
                  <option value="Alimentos">Alimentos</option>
                  <option value="Ropa">Ropa</option>
                  <option value="Juguetes">Juguetes</option>
                  <option value="Cuidado">Cuidado</option>
                  <option value="Transporte">Transporte</option>
                </select>
              </div>

              <div>
                <label htmlFor="raza" className="block text-sm font-medium text-gray-700">
                  Raza
                </label>
                <select
                  id="raza"
                  name="raza"
                  value={filters.raza}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                >
                  <option value="">Todas</option>
                  <option value="Dachshund">Dachshund</option>
                  <option value="Poodle">Poodle</option>
                  <option value="Ambas">Ambas</option>
                </select>
              </div>

              <div>
                <label htmlFor="precioMin" className="block text-sm font-medium text-gray-700">
                  Precio Mínimo
                </label>
                <input
                  id="precioMin"
                  name="precioMin"
                  type="number"
                  value={filters.precioMin}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  placeholder="Mínimo"
                />
              </div>

              <div>
                <label htmlFor="precioMax" className="block text-sm font-medium text-gray-700">
                  Precio Máximo
                </label>
                <input
                  id="precioMax"
                  name="precioMax"
                  type="number"
                  value={filters.precioMax}
                  onChange={handleFilterChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  placeholder="Máximo"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post._id}
              to={`/publicacion/${post._id}`}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.imagenes[0]}
                  alt={post.titulo}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.titulo}</h3>
                <p className="text-xl font-bold text-pink-500 mb-2">${post.precio}</p>
                <p className="text-gray-600 text-sm mb-4">{post.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {post.categoria}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {post.raza}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No se encontraron publicaciones que coincidan con los filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostGallery; 