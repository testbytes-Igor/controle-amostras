import DashboardCharts from "./DashboardCharts";

export default function Visitante({ amostras, onEntrar }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-between p-8 border-b border-gray-700">
        <div>
          <h1 className="text-3xl font-bold">Painel de Amostras</h1>
          <p className="text-gray-400 text-sm">
            Visualização em tempo real do status das análises do laboratório
          </p>
        </div>

        <button
          onClick={onEntrar}
          className="bg-blue-600 hover:bg-blue-700 transition px-5 py-2 rounded-lg font-semibold"
        >
          Acessar sistema
        </button>
      </header>

      <main className="p-8">
        <DashboardCharts amostras={amostras} />
      </main>
    </div>
  );
}

