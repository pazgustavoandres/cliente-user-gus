import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    precio: '',
    categoria: '',
    raza: '',
    imagenes: []
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      imagenes: [...formData.imagenes, ...files]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('precio', formData.precio);
      formDataToSend.append('categoria', formData.categoria);
      formDataToSend.append('raza', formData.raza);
      formData.imagenes.forEach((imagen) => {
        formDataToSend.append('imagenes', imagen);
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/posts`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/mis-publicaciones');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear la publicación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crear Nueva Publicación</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  placeholder="Ej: Gorro elegante para Dachshund"
                />
              </div>

              <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  required
                  value={formData.descripcion}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  placeholder="Describe tu producto..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                    Precio
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="precio"
                      name="precio"
                      type="number"
                      required
                      value={formData.precio}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    required
                    value={formData.categoria}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="Accesorios">Accesorios</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Cuidado">Cuidado</option>
                    <option value="Transporte">Transporte</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="raza" className="block text-sm font-medium text-gray-700">
                  Raza
                </label>
                <select
                  id="raza"
                  name="raza"
                  required
                  value={formData.raza}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                >
                  <option value="">Selecciona una raza</option>
                  <option value="Dachshund">Dachshund</option>
                  <option value="Poodle">Poodle</option>
                  <option value="Ambas">Ambas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Imágenes
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="imagenes"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-pink-500 hover:text-pink-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
                      >
                        <span>Subir imágenes</span>
                        <input
                          id="imagenes"
                          name="imagenes"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                  </div>
                </div>
                {formData.imagenes.length > 0 && (
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {formData.imagenes.map((imagen, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(imagen)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition-colors duration-300 disabled:opacity-50"
                >
                  {isLoading ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost; 