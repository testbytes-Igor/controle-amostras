import { useState } from "react";
import { usuarios } from "../Data/usuarios";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(e) {
    e.preventDefault();

    const user = usuario.trim().toLowerCase();
    const pass = senha.trim();

    const encontrado = usuarios.find(
      (u) =>
        u.usuario.toLowerCase() === user &&
        u.senha === pass
    );

    if (encontrado) {
      localStorage.setItem("usuarioLogado", encontrado.usuario);
      onLogin(encontrado.usuario);
    } else {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={entrar}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setErro("");
          }}
          className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErro("");
          }}
          className="w-full px-3 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {erro && (
          <p className="text-red-400 text-sm text-center">{erro}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
