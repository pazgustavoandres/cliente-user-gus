import { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    id: 1,
    nombre: "Producto Ejemplo",
    precio: 99.99,
    descripcion: "Descripción detallada del producto",
    imagen: "/producto.jpg",
    activo: true,
    vendedor: {
      id: 1,
      nombre: "Vendedor Ejemplo",
      calificacion: 4.5
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagen del producto */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.nombre}</h1>
            <p className="text-2xl font-semibold text-blue-600 mt-2">
              ${product.precio.toFixed(2)}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Descripción</h2>
            <p className="text-gray-600">{product.descripcion}</p>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.activo ? 'Disponible' : 'No disponible'}
            </span>
          </div>

          {/* Información del vendedor */}
          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Información del Vendedor</h3>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{product.vendedor.nombre}</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.vendedor.calificacion)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
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
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex space-x-4 pt-6">
            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-medium">
              Comprar Ahora
            </button>
            <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 font-medium">
              Contactar Vendedor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 