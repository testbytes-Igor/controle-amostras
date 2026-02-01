import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Visitante from "./components/Visitante";
import DashboardCharts from "./components/DashboardCharts";
import { enviarParaPlanilha, buscarDaPlanilha } from "./services/planilha";

function App() {
  const [amostras, setAmostras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  // 🔹 Carrega usuário logado
  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (user) setUsuario(user);
  }, []);

  // 🔹 Busca dados da planilha sempre ao abrir
  useEffect(() => {
    async function carregar() {
      const dados = await buscarDaPlanilha();
      setAmostras(dados);
    }
    carregar();
  }, []);

  async function salvarAmostra(dados) {
    await enviarParaPlanilha(dados);
    const atualizadas = await buscarDaPlanilha();
    setAmostras(atualizadas);
  }

  function podeEditar(amostra) {
    return usuario === "Igor" || usuario === amostra.criadoPor;
  }

  // 🟡 TELA VISITANTE (não logado)
  if (!usuario && !mostrarLogin) {
    return (
      <div>
        <Visitante amostras={amostras} />
        <div className="fixed top-4 right-4">
          <button
            onClick={() => setMostrarLogin(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }

  // 🔵 TELA LOGIN
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

  // 🟢 SISTEMA LOGADO
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between mb-6">
        <p>
          Usuário: <strong>{usuario}</strong>
        </p>
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

      <h1 className="text-3xl font-bold mb-6">Controle de Amostras</h1>

      <DashboardCharts amostras={amostras} />

      <button
        onClick={() => {
          setEditando(null);
          setModalOpen(true);
        }}
        className="bg-blue-600 px-4 py-2 rounded my-6"
      >
        Nova Amostra
      </button>

      <div className="grid gap-4">
        {amostras.map((a) => (
          <div
            key={a.id}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{a.numeroSerie}</p>
              <p className="text-sm text-gray-400">Modelo: {a.modelo}</p>
              <p className="text-sm text-gray-400">
                Criado por: {a.criadoPor}
              </p>
            </div>

            {podeEditar(a) && (
              <button
                onClick={() => {
                  setEditando(a);
                  setModalOpen(true);
                }}
                className="bg-yellow-600 px-3 py-1 rounded"
              >
                Editar
              </button>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={salvarAmostra}
        amostra={editando}
        usuario={usuario}
      />
    </div>
  );
}

export default App;














