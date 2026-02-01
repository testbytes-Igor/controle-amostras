const URL_SCRIPT = "https://script.google.com/macros/library/d/1SM1VqVJCwx4hU6loVHBb_IceDgEdp1U749nXGCTPJwe_bA5OWigfBtHz/12";
const TOKEN = "LAB_AMOSTRAS_2026";

export async function enviarParaPlanilha(amostra) {
  await fetch(URL_SCRIPT, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...amostra,
      token: TOKEN,
    }),
  });
}

export async function buscarDaPlanilha() {
  const response = await fetch(URL_SCRIPT);
  return await response.json();
}






