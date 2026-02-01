function DashboardCharts({ amostras }) {
  const emTeste = amostras.filter(a => a.status === "Em teste").length;
  const aguardando = amostras.filter(a => a.status === "Aguardando").length;
  const ok = amostras.filter(a => a.status === "Finalizado" && a.observacao === "OK").length;
  const nok = amostras.filter(a => a.status === "Finalizado" && a.observacao === "NOK").length;

  return (
    <div className="grid grid-cols-4 gap-4 my-6">
      <div className="bg-blue-700 p-4 rounded">Em teste: {emTeste}</div>
      <div className="bg-yellow-600 p-4 rounded">Aguardando: {aguardando}</div>
      <div className="bg-green-600 p-4 rounded">OK: {ok}</div>
      <div className="bg-red-600 p-4 rounded">NOK: {nok}</div>
    </div>
  );
}

export default DashboardCharts;

