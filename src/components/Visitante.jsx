import DashboardCharts from "./DashboardCharts";

export default function Visitante({ amostras, entrar }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Painel de Amostras (Visualização)
        </h1>

        <button
          onClick={entrar}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Login
        </button>
      </div>

      <DashboardCharts amostras={amostras} />

      <div className="grid gap-4 mt-6">
        {amostras.map((a) => (
          <div
            key={a.id}
            className="bg-gray-800 p-4 rounded shadow"
          >
            <p className="font-semibold">
              Série: {a.serie}
            </p>
            <p className="text-sm text-gray-400">
              Modelo: {a.modelo}
            </p>
            <p className="text-sm text-gray-400">
              Status: {a.status}
            </p>
            <p className="text-sm text-gray-400">
              Observação: {a.observacao}
            </p>
            <p className="text-sm text-gray-400">
              Criado por: {a.criadoPor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
