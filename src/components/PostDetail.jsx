import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Error al cargar la publicación');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleContact = () => {
    // Aquí se implementaría la lógica para contactar al vendedor
    console.log('Contactando al vendedor...');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando publicación...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600">Publicación no encontrada</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="relative">
                  <img
                    src={post.imagenes[currentImageIndex]}
                    alt={post.titulo}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  {post.imagenes.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                      {post.imagenes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full ${
                            currentImageIndex === index ? 'bg-pink-500' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {post.imagenes.map((imagen, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-lg overflow-hidden ${
                        currentImageIndex === index ? 'ring-2 ring-pink-500' : ''
                      }`}
                    >
                      <img
                        src={imagen}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.titulo}</h1>
                <p className="text-2xl font-bold text-pink-500 mb-4">${post.precio}</p>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {post.categoria}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {post.raza}
                  </span>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Descripción</h2>
                  <p className="text-gray-600">{post.descripcion}</p>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Información del Vendedor</h2>
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.vendedor.foto || '/images/default-avatar.png'}
                      alt={post.vendedor.nombre}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{post.vendedor.nombre}</p>
                      <p className="text-sm text-gray-500">{post.vendedor.ubicacion}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleContact}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                >
                  Contactar al Vendedor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail; 