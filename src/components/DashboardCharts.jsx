export default function DashboardCharts({ amostras }) {
  const stats = amostras.reduce(
    (acc, a) => {
      if (a.status === "Em teste") acc.emTeste++;
      else if (a.status === "Aguardando") acc.aguardando++;
      else if (a.status === "Finalizado") {
        if (a.observacao === "OK") acc.ok++;
        else if (a.observacao === "NOK") acc.nok++;
      }
      return acc;
    },
    { emTeste: 0, aguardando: 0, ok: 0, nok: 0 }
  );

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="bg-blue-600 p-6 rounded-xl shadow">
        Em teste: {stats.emTeste}
      </div>
      <div className="bg-yellow-600 p-6 rounded-xl shadow">
        Aguardando: {stats.aguardando}
      </div>
      <div className="bg-green-600 p-6 rounded-xl shadow">
        OK: {stats.ok}
      </div>
      <div className="bg-red-600 p-6 rounded-xl shadow">
        NOK: {stats.nok}
      </div>
    </div>
  );
}
