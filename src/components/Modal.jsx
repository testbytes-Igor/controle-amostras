import { useState, useEffect } from "react";

function Modal({ isOpen, onClose, onSave, amostra }) {
  const [serie, setSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("");
  const [observacao, setObservacao] = useState("Pendente");
  const [destinacao, setDestinacao] = useState("");

  // Preencher campos quando estiver editando
  useEffect(() => {
    if (amostra) {
      setSerie(amostra.serie);
      setModelo(amostra.modelo);
      setStatus(amostra.status);
      setObservacao(amostra.observacao);
      setDestinacao(amostra.destinacao || "");
    } else {
      // Limpa quando for nova amostra
      setSerie("");
      setModelo("");
      setStatus("");
      setObservacao("Pendente");
      setDestinacao("");
    }
  }, [amostra]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!serie || !modelo || !status) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (status === "Finalizado" && !destinacao) {
      alert("Informe a destinação quando o status for Finalizado.");
      return;
    }

    const dadosAmostra = {
      id: amostra ? amostra.id : Date.now(),
      serie,
      modelo,
      status,
      observacao,
      destinacao,
    };

    onSave(dadosAmostra);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[520px] p-6 shadow-lg text-gray-800">
        <h2 className="text-xl font-bold mb-4">
          {amostra ? "Editar Amostra" : "Nova Amostra"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Número de Série */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Número de Série *
            </label>
            <input
              type="text"
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: 23BRX88921"
            />
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Modelo *
            </label>
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: MD-RT650EVK"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecione</option>
              <option value="Em teste">Em teste</option>
              <option value="Aguardando">Aguardando</option>
              <option value="Finalizado">Finalizado</option>
            </select>
          </div>

          {/* Observação */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Observação
            </label>
            <select
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Pendente">Pendente</option>
              <option value="OK">OK</option>
              <option value="NOK">NOK</option>
            </select>
          </div>

          {/* Destinação */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Destinação {status === "Finalizado" && "*"}
            </label>
            <input
              type="text"
              value={destinacao}
              onChange={(e) => setDestinacao(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Ex: Descarte, Retorno fornecedor, Arquivo..."
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
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








