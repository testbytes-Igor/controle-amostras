import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Visitante from "./components/Visitante";
import DashboardCharts from "./components/DashboardCharts";
import { enviarParaPlanilha, buscarDaPlanilha } from "./services/planilha";

function App() {
  const [amostras, setAmostras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [modoVisitante, setModoVisitante] = useState(true);
  const [amostraEditando, setAmostraEditando] = useState(null);

  // 🔵 Carrega dados da planilha ao iniciar
  useEffect(() => {
    async function carregar() {
      const dados = await buscarDaPlanilha();
      setAmostras(dados);
    }
    carregar();
  }, []);

  // 🔵 Adicionar nova amostra
  async function adicionarAmostra(novaAmostra) {
    await enviarParaPlanilha(novaAmostra);
    setAmostras((prev) => [...prev, novaAmostra]);
    setModalOpen(false);
  }

  // 🔵 Editar amostra (apenas visual no app, histórico fica na planilha)
  function editarAmostra(amostraAtualizada) {
    setAmostras((prev) =>
      prev.map((a) => (a.id === amostraAtualizada.id ? amostraAtualizada : a))
    );
    setModalOpen(false);
    setAmostraEditando(null);
  }

  // 🔵 Logout
  function sair() {
    setUsuario(null);
    setModoVisitante(true);
  }

  // 🟡 TELA VISITANTE
  if (modoVisitante) {
    return (
      <Visitante
        amostras={amostras}
        entrar={() => setModoVisitante(false)}
      />
    );
  }

  // 🟢 TELA LOGIN
  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  // 🔴 TELA PRINCIPAL (LOGADO)
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Controle de Amostras</h1>
          <p className="text-gray-400">Usuário: <strong>{usuario}</strong></p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setAmostraEditando(null);
              setModalOpen(true);
            }}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Nova Amostra
          </button>

          <button
            onClick={sair}
            className="bg-red-600 px-4 py-2 rounded"
          >
            Sair
          </button>
        </div>
      </div>

      {/* GRÁFICOS */}
      <DashboardCharts amostras={amostras} />

      {/* LISTA */}
      <div className="grid gap-4 mt-6">
        {amostras.map((amostra) => (
          <div
            key={amostra.id}
            className="bg-gray-800 p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                Nº Série: {amostra.numeroSerie}
              </p>
              <p className="text-sm text-gray-400">
                Modelo: {amostra.modelo}
              </p>
              <p className="text-sm text-gray-400">
                Status: {amostra.status} | Obs: {amostra.observacao}
              </p>
              <p className="text-sm text-gray-500">
                Criado por: {amostra.criadoPor}
              </p>
            </div>

            {/* Só Igor pode editar tudo */}
            {(usuario === "Igor" || usuario === amostra.criadoPor) && (
              <button
                onClick={() => {
                  setAmostraEditando(amostra);
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

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={amostraEditando ? editarAmostra : adicionarAmostra}
        amostraEditando={amostraEditando}
        usuario={usuario}
      />
    </div>
  );
}

export default App;












