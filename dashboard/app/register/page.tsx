"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  // 📦 Estados tipados con TypeScript
  const [nombre, setNombre] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  // ⚙️ Maneja el registro del usuario
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita recargar la página

    // 🚀 1️⃣ Registrar al usuario en el sistema de autenticación
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setMessage("❌ Error en registro: " + authError.message);
      return;
    }

    // ⚠️ Verificar si se obtuvo un ID de usuario
    const userId = authData.user?.id;
    if (!userId) {
      setMessage("⚠️ No se pudo obtener el ID del usuario.");
      return;
    }

    // 📘 2️⃣ Insertar datos en la tabla 'estudiantes'
    const { error: insertError } = await supabase
      .from("estudiantes")
      .insert([
        {
          id: userId,
          nombre,
          correo: email,
          telefono,
        },
      ]);

    if (insertError) {
      setMessage("⚠️ Usuario autenticado pero no guardado: " + insertError.message);
      return;
    }

    // ✅ Éxito
    setMessage("✅ Usuario registrado correctamente. Revisa tu correo para confirmar.");

    // 🧹 Limpieza opcional de los campos
    setNombre("");
    setEmail("");
    setTelefono("");
    setPassword("");
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4 text-center">Registro de estudiante</h1>

      {/* 📋 Al enviar el formulario se ejecuta handleRegister */}
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        {/* Campo para el nombre */}
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="border p-2 rounded"
        />

        {/* Campo para el correo */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded"
        />

        {/* Campo para el teléfono */}
        <input
          type="tel"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border p-2 rounded"
        />

        {/* Campo para la contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Registrarse
        </button>
      </form>

      {/* 💬 Mensaje de éxito o error */}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
