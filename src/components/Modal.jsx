import { useState, useEffect } from "react";
import { criarModeloAmostra } from "../models/AmostraModel";

function Modal({ isOpen, onClose, onSave, amostraEditando, usuario }) {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("em_teste");
  const [observacao, setObservacao] = useState("pendente");
  const [destinacao, setDestinacao] = useState("");

  // 🔵 Preenche quando estiver editando
  useEffect(() => {
    if (amostraEditando) {
      setNumeroSerie(amostraEditando.numeroSerie);
      setModelo(amostraEditando.modelo);
      setStatus(amostraEditando.status);
      setObservacao(amostraEditando.observacao);
      setDestinacao(amostraEditando.destinacao || "");
    } else {
      setNumeroSerie("");
      setModelo("");
      setStatus("em_teste");
      setObservacao("pendente");
      setDestinacao("");
    }
  }, [amostraEditando]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!numeroSerie || !modelo || !status) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (status === "finalizado" && !destinacao) {
      alert("Informe a destinação quando o status for Finalizado.");
      return;
    }

    let amostraFinal;

    // 🟡 Se estiver editando
    if (amostraEditando) {
      amostraFinal = {
        ...amostraEditando,
        numeroSerie,
        modelo,
        status,
        observacao,
        destinacao,
        editadoPor: usuario,
      };
    }
    // 🟢 Nova amostra
    else {
      amostraFinal = criarModeloAmostra({
        numeroSerie,
        modelo,
        status,
        observacao,
        destinacao,
        usuario,
      });
    }

    onSave(amostraFinal);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[520px] p-6 shadow-lg text-gray-800">
        <h2 className="text-xl font-bold mb-4">
          {amostraEditando ? "Editar Amostra" : "Nova Amostra"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Número de Série */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Número de Série *
            </label>
            <input
              type="text"
              value={numeroSerie}
              onChange={(e) => setNumeroSerie(e.target.value)}
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
              <option value="em_teste">Em teste</option>
              <option value="aguardando">Aguardando</option>
              <option value="finalizado">Finalizado</option>
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
              <option value="pendente">Pendente</option>
              <option value="OK">OK</option>
              <option value="NOK">NOK</option>
            </select>
          </div>

          {/* Destinação */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Destinação {status === "finalizado" && "*"}
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









