import { useState, useEffect } from "react";

function Modal({ isOpen, onClose, onSave, amostra }) {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("em_teste");
  const [observacao, setObservacao] = useState("pendente");
  const [destinacao, setDestinacao] = useState("");

  useEffect(() => {
    if (amostra) {
      setNumeroSerie(amostra.numeroSerie);
      setModelo(amostra.modelo);
      setStatus(amostra.status);
      setObservacao(amostra.observacao);
      setDestinacao(amostra.destinacao || "");
    }
  }, [amostra]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      id: amostra?.id,
      numeroSerie,
      modelo,
      status,
      observacao,
      destinacao,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-[500px] text-black">
        <h2 className="text-xl mb-4">Amostra</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Número de Série"
          value={numeroSerie}
          onChange={(e) => setNumeroSerie(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="em_teste">Em teste</option>
          <option value="aguardando">Aguardando</option>
          <option value="finalizado">Finalizado</option>
        </select>

        <select
          className="border p-2 w-full mb-2"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        >
          <option value="pendente">Pendente</option>
          <option value="OK">OK</option>
          <option value="NOK">NOK</option>
        </select>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Destinação"
          value={destinacao}
          onChange={(e) => setDestinacao(e.target.value)}
        />

        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </div>
    </div>
  );
}

export default Modal;













