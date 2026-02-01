const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbx4dmatOexlBVcxtlSbgi4m7hJBTmXN05Ev7VnE9dieGa6mO3kWpWZqCnqCWnE7cTLK/exec";
const TOKEN = "LAB_AMOSTRAS_2026";

export async function salvarAmostra(amostra) {
  await fetch(URL_SCRIPT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: amostra.id,
      numeroSerie: amostra.numeroSerie,
      modelo: amostra.modelo,
      status: amostra.status,
      observacao: amostra.observacao,
      destinacao: amostra.destinacao,
      criadoPor: amostra.criadoPor,
      editadoPor: amostra.editadoPor,
      token: TOKEN,
    }),
  });
}

export async function buscarAmostras() {
  const resp = await fetch(URL_SCRIPT);
  return await resp.json();
}








