import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Visitante from "./components/Visitante";
import DashboardCharts from "./components/DashboardCharts";
import { salvarAmostra, buscarAmostras } from "./services/planilha";

function App() {
  const [amostras, setAmostras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [amostraEditando, setAmostraEditando] = useState(null);
  const [usuario, setUsuario] = useState(null);

  // 🔵 Carrega SEMPRE da planilha ao iniciar
  async function carregarAmostras() {
    const dados = await buscarAmostras();
    setAmostras(dados);
  }

  useEffect(() => {
    carregarAmostras();
  }, []);

  // 🟢 Salvar nova ou edição
  async function handleSave(amostra) {
    await salvarAmostra(amostra);
    await carregarAmostras(); // recarrega da planilha
  }

  function abrirNovoModal() {
    setAmostraEditando(null);
    setModalOpen(true);
  }

  function abrirEdicao(amostra) {
    setAmostraEditando(amostra);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Controle de Amostras</h1>

        {usuario ? (
          <div className="flex items-center gap-4">
            <p>Usuário: <strong>{usuario}</strong></p>
            <button
              onClick={() => setUsuario(null)}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Sair
            </button>
          </div>
        ) : (
          <Login setUsuario={setUsuario} />
        )}
      </div>

      {/* DASHBOARD */}
      <DashboardCharts amostras={amostras} />

      {/* BOTÃO NOVA AMOSTRA (só logado) */}
      {usuario && (
        <button
          onClick={abrirNovoModal}
          className="bg-blue-600 px-4 py-2 rounded mt-6 mb-6"
        >
          Nova Amostra
        </button>
      )}

      {/* LISTA / VISITANTE */}
      <Visitante
        amostras={amostras}
        onEditar={usuario ? abrirEdicao : null}
      />

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        amostraEditando={amostraEditando}
        usuario={usuario}
      />

    </div>
  );
}

export default App;













