import { useState, useEffect } from "react";

export default function Modal({ isOpen, onClose, onSave, amostra }) {
  const [numeroSerie, setNumeroSerie] = useState("");
  const [modelo, setModelo] = useState("");
  const [status, setStatus] = useState("em_teste");
  const [observacao, setObservacao] = useState("Pendente");
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded text-black w-[500px]">
        <form onSubmit={handleSubmit} className="space-y-3">

          <input value={numeroSerie} onChange={e => setNumeroSerie(e.target.value)} placeholder="Numero de Série" className="w-full border p-2"/>

          <input value={modelo} onChange={e => setModelo(e.target.value)} placeholder="Modelo" className="w-full border p-2"/>

          <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border p-2">
            <option value="em_teste">Em teste</option>
            <option value="aguardando">Aguardando</option>
            <option value="finalizado">Finalizado</option>
          </select>

          <select value={observacao} onChange={e => setObservacao(e.target.value)} className="w-full border p-2">
            <option>Pendente</option>
            <option>OK</option>
            <option>NOK</option>
          </select>

          <input value={destinacao} onChange={e => setDestinacao(e.target.value)} placeholder="Destinação" className="w-full border p-2"/>

          <button className="bg-blue-600 text-white px-4 py-2">Salvar</button>
        </form>
      </div>
    </div>
  );
}











