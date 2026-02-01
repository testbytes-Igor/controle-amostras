const URL = "https://script.google.com/macros/s/AKfycbwt5M3b951S4Q62GgQN1NTzPegXAANxrKAEnuWVpWQJXvSLITxE31iLQqwLIWNlR9p7/exec";
const TOKEN = "LAB_AMOSTRAS_2026";

export async function enviarParaPlanilha(dados) {
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: JSON.stringify({
        ...dados,
        token: TOKEN,
      }),
    }),
  });
}












