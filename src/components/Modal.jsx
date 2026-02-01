import { useState, useEffect } from "react";
import { criarModeloAmostra } from "../models/AmostraModel";

function Modal({ isOpen, onClose, onSave, amostraEditando, usuario }) {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("em_teste");
  const [observacao, setObservacao] = useState("pendente");
  const [destinacao, setDestinacao] = useState("");

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

    if (!numeroSerie || !modelo) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    if (status === "finalizado" && !destinacao) {
      alert("Informe a destinação para finalizado.");
      return;
    }

    let amostraFinal;

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
    } else {
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
      <div className="bg-white text-gray-800 p-6 rounded w-[500px]">
        <h2 className="text-xl font-bold mb-4">
          {amostraEditando ? "Editar Amostra" : "Nova Amostra"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Número de Série"
            value={numeroSerie}
            onChange={(e) => setNumeroSerie(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="em_teste">Em teste</option>
            <option value="aguardando">Aguardando</option>
            <option value="finalizado">Finalizado</option>
          </select>

          <select
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="pendente">Pendente</option>
            <option value="OK">OK</option>
            <option value="NOK">NOK</option>
          </select>

          <input
            type="text"
            placeholder="Destinação"
            value={destinacao}
            onChange={(e) => setDestinacao(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} type="button" className="bg-gray-400 px-4 py-2 rounded text-white">
              Cancelar
            </button>
            <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;










