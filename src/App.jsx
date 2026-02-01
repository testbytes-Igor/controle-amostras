import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import DashboardCharts from "./components/DashboardCharts";
import Visitante from "./components/Visitante";
import Login from "./components/Login";
import { enviarParaPlanilha, buscarDaPlanilha } from "./services/planilha";
import { criarModeloAmostra } from "./models/AmostraModel";

export default function App() {
  const [amostras, setAmostras] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);

  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (user) setUsuario(user);
    carregar();
  }, []);

  async function carregar() {
    try {
      setLoading(true);
      const dados = await buscarDaPlanilha();
      setAmostras(dados);
    } catch (e) {
      console.error("Erro ao carregar amostras", e);
    } finally {
      setLoading(false);
    }
  }

  async function salvar(dados) {
    const modelo = criarModeloAmostra(dados, usuario);

    try {
      await enviarParaPlanilha(modelo);

      // 🔥 atualiza local sem recarregar tudo
      setAmostras((prev) => {
        const existe = prev.find(a => a.id === modelo.id);
        if (existe) {
          return prev.map(a => a.id === modelo.id ? modelo : a);
        }
        return [...prev, modelo];
      });
    } catch (e) {
      console.error("Erro ao salvar", e);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Carregando dados...
      </div>
    );
  }

  // VISITANTE
  if (!usuario && !mostrarLogin) {
    return (
      <Visitante
        amostras={amostras}
        onEntrar={() => setMostrarLogin(true)}
      />
    );
  }

  // LOGIN
  if (!usuario && mostrarLogin) {
    return (
      <Login
        onLogin={(user) => {
          localStorage.setItem("usuarioLogado", user);
          setUsuario(user);
        }}
      />
    );
  }

  // SISTEMA
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between mb-4">
        <p>Usuário: <strong>{usuario}</strong></p>
        <button
          onClick={() => {
            localStorage.removeItem("usuarioLogado");
            setUsuario(null);
          }}
          className="bg-red-600 px-3 py-1 rounded"
        >
          Sair
        </button>
      </div>

      <h1 className="text-3xl mb-4">Controle de Amostras</h1>

      <DashboardCharts amostras={amostras} />

      <button
        onClick={() => {
          setEditando(null);
          setModalOpen(true);
        }}
        className="bg-blue-600 px-4 py-2 rounded my-4"
      >
        Nova Amostra
      </button>

      {amostras.map((a) => (
        <div key={a.id} className="bg-gray-800 p-4 rounded my-2">
          {a.numeroSerie} - {a.modelo}
          <button
            onClick={() => {
              setEditando(a);
              setModalOpen(true);
            }}
            className="ml-4 bg-yellow-600 px-2 py-1 rounded"
          >
            Editar
          </button>
        </div>
      ))}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={salvar}
        amostra={editando}
      />
    </div>
  );
}
