import { useState } from "react";
import { usuarios } from "../Data/usuarios";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar() {
    const encontrado = usuarios.find(
      (u) => u.usuario === usuario && u.senha === senha
    );

    if (encontrado) {
      localStorage.setItem("usuarioLogado", usuario);
      onLogin(usuario);
    } else {
      setErro("Usuário ou senha inválidos");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          placeholder="Usuário"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mb-3 px-3 py-2 rounded bg-gray-700"
        />

        {erro && <p className="text-red-400 text-sm mb-3">{erro}</p>}

        <button
          onClick={entrar}
          className="w-full bg-blue-600 py-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
