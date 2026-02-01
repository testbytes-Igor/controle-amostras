import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardCharts({ amostras }) {
  // Em andamento (não finalizado)
  const emAndamento = amostras.filter(
    (a) => a.status !== "Finalizado"
  ).length;

  // Finalizados OK / NOK
  const ok = amostras.filter(
    (a) => a.status === "Finalizado" && a.observacao === "OK"
  ).length;

  const nok = amostras.filter(
    (a) => a.status === "Finalizado" && a.observacao === "NOK"
  ).length;

  const dataAndamento = [
    { name: "Em andamento", value: emAndamento },
  ];

  const dataFinalizados = [
    { name: "OK", value: ok },
    { name: "NOK", value: nok },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#ef4444"];

  return (
    <div className="grid grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow text-gray-800">

      {/* Gráfico Em Andamento */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Amostras em Andamento
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dataAndamento}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill={COLORS[0]}
              label
            >
              {dataAndamento.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[0]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico Finalizados */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          Finalizadas (OK / NOK)
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={dataFinalizados}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              <Cell fill={COLORS[1]} />
              <Cell fill={COLORS[2]} />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
