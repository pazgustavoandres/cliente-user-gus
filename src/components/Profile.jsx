import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    foto: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData(response.data);
      } catch (err) {
        setError('Error al cargar el perfil');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/users/profile`, userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setIsEditing(false);
    } catch (err) {
      setError('Error al actualizar el perfil');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Mi Perfil</h2>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-pink-500 hover:text-pink-600"
              >
                Cerrar sesión
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative">
                  <img
                    src={userData.foto || '/images/default-avatar.png'}
                    alt="Foto de perfil"
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors duration-300">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              <div className="md:w-2/3">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      value={userData.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo electrónico
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                      Teléfono
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      value={userData.telefono}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                      Dirección
                    </label>
                    <input
                      id="direccion"
                      name="direccion"
                      type="text"
                      value={userData.direccion}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                        >
                          Guardar cambios
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                      >
                        Editar perfil
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 