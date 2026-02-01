const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbzuFlJqbdWjE5yvZYtJuDYIPcGRotNukNBsBT4mZR49_-nQgB7gRaWii6rmW1mfBOpl/exec";
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






