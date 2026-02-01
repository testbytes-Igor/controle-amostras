import { useState, useEffect } from "react";

function Modal({ isOpen, onClose, onSave, amostra }) {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("");
  const [observacao, setObservacao] = useState("Pendente");
  const [destinacao, setDestinacao] = useState("");

  useEffect(() => {
    if (amostra) {
      setNumeroSerie(amostra.numeroSerie || "");
      setModelo(amostra.modelo || "");
      setStatus(amostra.status || "");
      setObservacao(amostra.observacao || "Pendente");
      setDestinacao(amostra.destinacao || "");
    } else {
      limparCampos();
    }
  }, [amostra]);

  function limparCampos() {
    setNumeroSerie("");
    setModelo("");
    setStatus("");
    setObservacao("Pendente");
    setDestinacao("");
  }

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!numeroSerie || !modelo || !status) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    if (status === "Finalizado" && !destinacao) {
      alert("Informe a destinação!");
      return;
    }

    // 🔥 AQUI ESTÁ A CORREÇÃO CRÍTICA
    const dadosCompletos = {
      ...amostra, // preserva criadoPor, editadoPor, data
      id: amostra?.id || Date.now().toString(),
      numeroSerie,
      modelo,
      status,
      observacao,
      destinacao,
    };

    onSave(dadosCompletos);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[520px] p-6 shadow-lg text-gray-800">
        <h2 className="text-xl font-bold mb-4">
          {amostra ? "Editar Amostra" : "Nova Amostra"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Número de Série"
            value={numeroSerie}
            onChange={(e) => setNumeroSerie(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Selecione</option>
            <option>Em teste</option>
            <option>Aguardando</option>
            <option>Finalizado</option>
          </select>

          <select
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option>Pendente</option>
            <option>OK</option>
            <option>NOK</option>
          </select>

          <input
            placeholder="Destinação"
            value={destinacao}
            onChange={(e) => setDestinacao(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 rounded text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded text-white"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;












