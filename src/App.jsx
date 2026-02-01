import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import DashboardCharts from "./components/DashboardCharts";
import Visitante from "./components/Visitante";
import Login from "./components/Login";
import { enviarParaPlanilha, buscarDaPlanilha } from "./services/planilha";
import { criarModeloAmostra } from "./models/AmostraModel";

function App() {
  const [amostras, setAmostras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);

  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const [carregado, setCarregado] = useState(false);

  // Carrega usuário
  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (user) setUsuario(user);
  }, []);

  // Carrega dados da planilha
  useEffect(() => {
    async function carregar() {
      const dados = await buscarDaPlanilha();
      setAmostras(dados);
      setCarregado(true);
    }
    carregar();
  }, []);

  async function salvar(dados) {
    const modelo = criarModeloAmostra(dados, usuario);
    await enviarParaPlanilha(modelo);

    const atualizados = await buscarDaPlanilha();
    setAmostras(atualizados);
  }

  if (!carregado) {
    return <div className="text-white p-8">Carregando dados...</div>;
  }

  // VISITANTE
  if (!usuario && !mostrarLogin) {
    return (
      <Visitante amostras={amostras} onEntrar={() => setMostrarLogin(true)} />
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

export default App;



















