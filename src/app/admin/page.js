// src/app/admin/page.js
"use client";
import { useEffect, useState } from "react";
import AdminLayout from "../layouts/Admin";

export default function Admin() {
  const [valoraciones, setValoraciones] = useState([]);

  useEffect(() => {
    const fetchValoraciones = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/obtener`);
        if (response.ok) {
          const result = await response.json();
          setValoraciones(result.data);
        } else {
          console.error("Error en la respuesta de la API", response.status);
        }
      } catch (error) {
        console.error("Error fetching valoraciones:", error);
      }
    };
    fetchValoraciones();
  }, []);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="card w-full max-w-4xl shadow-lg bg-white p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Valoraciones de Usuarios</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Área</th>
                  <th>Linkedin</th>
                  <th>Comentario</th>
                </tr>
              </thead>
              <tbody>
                {valoraciones.length > 0 ? (
                  valoraciones.map((valoracion, index) => (
                    <tr key={index}>
                      <td>{valoracion.nombre}</td>
                      <td>{valoracion.apellido}</td>
                      <td>{valoracion.area}</td>
                      <td>{valoracion.linkedin}</td>
                      <td>{valoracion.comentario}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No hay valoraciones disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
