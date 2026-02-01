const URL = "https://script.google.com/macros/s/AKfycbyXRRJspUdp-jp8zozioSZpYf8tJ-3K2kb_cesZDGfdTQiOX5I04Ol-gG8VNI0EIKmK/exec";
const TOKEN = "LAB_AMOSTRAS_2026";

// 🔥 ENVIA (novo ou edição)
export async function enviarParaPlanilha(dados) {
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...dados,
      token: TOKEN,
      acao: "salvar", // 🔥 avisa o Apps Script
    }),
  });
}

// 🔥 BUSCA sempre dados frescos
export async function buscarDaPlanilha() {
  const resp = await fetch(`${URL}?t=${Date.now()}`);
  return await resp.json();
}










