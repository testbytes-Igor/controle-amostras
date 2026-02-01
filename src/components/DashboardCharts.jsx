export default function DashboardCharts({ amostras }) {
  const emTeste = amostras.filter(a => a.status === "em_teste").length;
  const aguardando = amostras.filter(a => a.status === "aguardando").length;
  const ok = amostras.filter(a => a.status === "finalizado" && a.observacao === "OK").length;
  const nok = amostras.filter(a => a.status === "finalizado" && a.observacao === "NOK").length;

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="bg-blue-600 p-6 rounded-xl">Em teste: {emTeste}</div>
      <div className="bg-yellow-600 p-6 rounded-xl">Aguardando: {aguardando}</div>
      <div className="bg-green-600 p-6 rounded-xl">OK: {ok}</div>
      <div className="bg-red-600 p-6 rounded-xl">NOK: {nok}</div>
    </div>
  );
}





