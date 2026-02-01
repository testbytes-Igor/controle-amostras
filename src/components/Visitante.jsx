import DashboardCharts from "./DashboardCharts";

export default function Visitante({ amostras, onEntrar }) {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl">Painel de Amostras (Visualização)</h1>
        <button
          onClick={onEntrar}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Entrar
        </button>
      </div>

      <DashboardCharts amostras={amostras} />
    </div>
  );
}
