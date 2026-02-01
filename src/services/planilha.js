const URL = "https://script.google.com/macros/s/AKfycbxYQpQYwhpYUzNj0Q2ZNIR4vWHgB6SZDmkydotUG6kwSzFM-Kxa-HD3k-Uz16PLzW3W/exec";
const TOKEN = "LAB_AMOSTRAS_2026";

export async function enviarParaPlanilha(dados) {
  await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      ...dados,
      token: TOKEN,
    }),
  });
}

export async function buscarDaPlanilha() {
  const resp = await fetch(URL);
  return await resp.json();
}









