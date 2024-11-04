"use client"; // Indica que es un componente de cliente en Next.js

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [valoraciones, setValoraciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchValoraciones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/obtener`);
        if (!response.ok) {
          throw new Error('Error al obtener las valoraciones');
        }
        const data = await response.json();
        setValoraciones(data.data); // Asegúrate de acceder a los datos correctamente
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchValoraciones();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Valoraciones de Usuarios</h1>
        {loading ? (
          <p>Cargando valoraciones...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full border-collapse text-black">
            <thead>
              <tr>
                <th className="border p-2 text-left">Nombre</th>
                <th className="border p-2 text-left">Apellido</th>
                <th className="border p-2 text-left">Área</th>
                <th className="border p-2 text-left">Linkedin</th> 
                <th className="border p-2 text-left">Comentario</th>
              </tr>
            </thead>
            <tbody>
              {valoraciones.map((valoracion, index) => (
                <tr key={index} className="border-t">
                  <td className="border p-2">{valoracion.nombre}</td>
                  <td className="border p-2">{valoracion.apellido}</td>
                  <td className="border p-2">{valoracion.area}</td>
                  <td className="border p-2">{valoracion.linkedin}</td>
                  <td className="border p-2">{valoracion.comentario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
