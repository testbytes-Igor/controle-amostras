import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import Login from "./components/Login";
import DashboardCharts from "./components/DashboardCharts";
import { enviarParaPlanilha } from "./services/planilha";

function App() {
  const [amostras, setAmostras] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [amostraEditando, setAmostraEditando] = useState(null);

  // Carregar usuário logado
  useEffect(() => {
    const user = localStorage.getItem("usuarioLogado");
    if (user) setUsuario(user);
  }, []);

  // Carregar amostras
  useEffect(() => {
    const dados = localStorage.getItem("amostras");
    if (dados) setAmostras(JSON.parse(dados));
  }, []);

  // Salvar sempre que mudar
  useEffect(() => {
    localStorage.setItem("amostras", JSON.stringify(amostras));
  }, [amostras]);

  function salvarAmostra(amostra) {
    if (amostraEditando) {
      const atualizadas = amostras.map((a) =>
        a.id === amostra.id
          ? { ...amostra, editadoPor: usuario }
          : a
      );
      setAmostras(atualizadas);
      enviarParaPlanilha({ ...amostra, editadoPor: usuario });
    } else {
      const nova = {
        ...amostra,
        id: Date.now(),
        criadoPor: usuario,
        editadoPor: usuario,
      };
      setAmostras([...amostras, nova]);
      enviarParaPlanilha(nova);
    }

    setModalOpen(false);
    setAmostraEditando(null);
  }

  function editarAmostra(amostra) {
    setAmostraEditando(amostra);
    setModalOpen(true);
  }

  function removerAmostra(id) {
    const lista = amostras.filter((a) => a.id !== id);
    setAmostras(lista);
  }

  if (!usuario) {
    return <Login onLogin={setUsuario} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between mb-4">
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
        onClick={() => setModalOpen(true)}
        className="bg-blue-600 px-4 py-2 rounded mb-6"
      >
        Nova Amostra
      </button>

      <div className="grid gap-4">
        {amostras.map((a) => (
          <div
            key={a.id}
            className="bg-gray-800 p-4 rounded flex justify-between"
          >
            <div>
              <p className="font-bold">{a.numeroSerie}</p>
              <p className="text-sm text-gray-400">Modelo: {a.modelo}</p>
              <p className="text-sm">Status: {a.status}</p>
              <p className="text-xs text-gray-500">
                Criado por: {a.criadoPor} | Editado por: {a.editadoPor}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => editarAmostra(a)}
                className="bg-yellow-600 px-3 py-1 rounded text-sm"
              >
                Editar
              </button>

              <button
                onClick={() => removerAmostra(a.id)}
                className="bg-red-600 px-3 py-1 rounded text-sm"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setAmostraEditando(null);
        }}
        onSave={salvarAmostra}
        amostraEditando={amostraEditando}
      />
    </div>
  );
}

export default App;










