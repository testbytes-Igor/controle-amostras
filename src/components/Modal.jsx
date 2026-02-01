import { useState, useEffect } from "react";

const STATUS = ["Em teste", "Aguardando", "Finalizado"];
const OBS = ["Pendente", "OK", "NOK"];

export default function Modal({ isOpen, onClose, onSave, amostra }) {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState(STATUS[0]);
  const [observacao, setObservacao] = useState(OBS[0]);
  const [destinacao, setDestinacao] = useState("");

  useEffect(() => {
    if (amostra) {
      setNumeroSerie(amostra.numeroSerie || "");
      setModelo(amostra.modelo || "");
      setStatus(amostra.status || STATUS[0]);
      setObservacao(amostra.observacao || OBS[0]);
      setDestinacao(amostra.destinacao || "");
    } else {
      // 🔥 limpa tudo quando é nova amostra
      setNumeroSerie("");
      setModelo("");
      setStatus(STATUS[0]);
      setObservacao(OBS[0]);
      setDestinacao("");
    }
  }, [amostra, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      // 🔥 Só envia id se estiver editando
      ...(amostra && { id: amostra.id }),

      numeroSerie,
      modelo,
      status,
      observacao,
      destinacao,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl text-black w-[500px] shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            value={numeroSerie}
            onChange={e => setNumeroSerie(e.target.value)}
            placeholder="Número de Série"
            className="w-full border p-2 rounded"
            required
          />

          <input
            value={modelo}
            onChange={e => setModelo(e.target.value)}
            placeholder="Modelo"
            className="w-full border p-2 rounded"
            required
          />

          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {STATUS.map(s => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={observacao}
            onChange={e => setObservacao(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {OBS.map(o => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <input
            value={destinacao}
            onChange={e => setDestinacao(e.target.value)}
            placeholder="Destinação"
            className="w-full border p-2 rounded"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}












