"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    area: "",
    linkedin: "",
    comentario: "",
  });
  const [alerta, setAlerta] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/agregar`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      if (result.status === "success") {
        setAlerta({
          tipo: "success",
          mensaje: "Comentario agregado exitosamente",
        });
      } else {
        setAlerta({
          tipo: "error",
          mensaje: "Hubo un error al agregar el comentario",
        });
      }
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensaje: "Error de conexión con el servidor",
      });
    }
    setFormData({
      nombre: "",
      apellido: "",
      area: "",
      linkedin: "",
      comentario: "",
    });
    setTimeout(() => setAlerta(null), 5000);
  };

  console.log(process.env.NEXT_PUBLIC_API_URL);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg space-y-6">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Deja tu comentario
        </h1>

        {alerta && (
          <div
            className={`p-4 mb-4 text-sm rounded-lg ${
              alerta.tipo === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {alerta.mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Información Personal
            </h2>
            {[
              { label: "Nombre", name: "nombre", placeholder: "Ej. Juan" },
              {
                label: "Apellido",
                name: "apellido",
                placeholder: "Ej. Pérez",
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                  required
                />
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Información Profesional
            </h2>
            {[
              {
                label: "Especialidad / Área",
                name: "area",
                placeholder: "Ej. Desarrollo Web, Diseño Gráfico",
              },
              {
                label: "LinkedIn",
                name: "linkedin",
                placeholder: "Ej. https://linkedin.com/in/tu-perfil",
              },
            ].map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-600">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                  required
                />
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-700 mb-4">
              Comentario
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Comentario
              </label>
              <textarea
                name="comentario"
                placeholder="Escribe tu comentario aquí..."
                value={formData.comentario}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                rows="4"
                required
              ></textarea>
              <p className="mt-2 text-sm text-gray-500">
                Ejemplo de comentario: &quot;Dinámico y responsable, con gran
                capacidad para resolver problemas y aportar ideas innovadoras en
                cada proyecto.&quot;
              </p>
            </div>
          </section>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Enviar comentario
          </button>
        </form>
      </div>
    </div>
  );
}
