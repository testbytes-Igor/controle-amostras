const URL = "https://script.google.com/macros/s/AKfycbxrpaFcnSNABbl7Bi_VI7WP7hOoi7N_Pb7A8iGGRXEVzyc-H-UxVg6pznsUS1DxHosj/exec";

// nunca deixe token hardcoded
const TOKEN = import.meta.env.VITE_TOKEN_PLANILHA;

async function safeFetch(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const resp = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (!resp.ok) {
      throw new Error(`Erro HTTP: ${resp.status}`);
    }

    return await resp.json();
  } finally {
    clearTimeout(timeout);
  }
}

// 🔥 ENVIA
export async function enviarParaPlanilha(dados) {
  try {
    const resposta = await safeFetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...dados,
        token: TOKEN,
        acao: "salvar",
      }),
    });

    return resposta;
  } catch (err) {
    console.error("Erro ao enviar:", err);
    throw err;
  }
}

// 🔥 BUSCA
export async function buscarDaPlanilha() {
  try {
    return await safeFetch(`${URL}?t=${Date.now()}`);
  } catch (err) {
    console.error("Erro ao buscar:", err);
    return [];
  }
}











