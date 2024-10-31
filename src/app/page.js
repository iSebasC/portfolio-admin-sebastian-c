"use client";

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ nombre: '', apellido: '', area: '', comentario: '' });
  const [alerta, setAlerta] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agregar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.status === 'success') {
        setAlerta({ tipo: 'success', mensaje: 'Comentario agregado exitosamente' });
      } else {
        setAlerta({ tipo: 'error', mensaje: 'Hubo un error al agregar el comentario' });
      }
    } catch (error) {
      setAlerta({ tipo: 'error', mensaje: 'Error de conexión con el servidor' });
    }
    setFormData({ nombre: '', apellido: '', area: '', comentario: '' });
    setTimeout(() => setAlerta(null), 5000);
  };

  console.log(process.env.NEXT_PUBLIC_API_URL);
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Deja tu comentario</h1>
        
        {alerta && (
          <div className={`p-4 mb-4 text-sm rounded ${alerta.tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {alerta.mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1 text-black" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Apellido</label>
            <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1 text-black" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Área</label>
            <input type="text" name="area" value={formData.area} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1 text-black" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Comentario</label>
            <textarea name="comentario" value={formData.comentario} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded mt-1 text-black" rows="4" required></textarea>
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Enviar comentario</button>
        </form>
      </div>
    </div>
  );
}
