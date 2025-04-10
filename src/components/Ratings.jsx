import { useState } from 'react';

const Ratings = () => {
  const [ratings, setRatings] = useState([
    {
      id: 1,
      idUsuario: 101,
      idVendedor: 201,
      estrellas: 5,
      comentario: "Excelente vendedor, muy atento y el producto llegó en perfecto estado.",
      fecha: "2024-03-15"
    },
    {
      id: 2,
      idUsuario: 102,
      idVendedor: 201,
      estrellas: 4,
      comentario: "Buen servicio, pero el envío tardó un poco más de lo esperado.",
      fecha: "2024-03-10"
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Calificaciones de Vendedores</h1>
      
      <div className="space-y-6">
        {ratings.map((rating) => (
          <div key={rating.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">
                  Usuario #{rating.idUsuario} → Vendedor #{rating.idVendedor}
                </p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < rating.estrellas ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">{rating.fecha}</span>
            </div>
            
            <p className="mt-4 text-gray-700">{rating.comentario}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings; 