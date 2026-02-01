const URL = "https://script.google.com/macros/s/AKfycbxrpaFcnSNABbl7Bi_VI7WP7hOoi7N_Pb7A8iGGRXEVzyc-H-UxVg6pznsUS1DxHosj/exec";
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










