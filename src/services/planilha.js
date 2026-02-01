const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxCrE-owqZLEPQwPOGQPUCkkn88OjOjVY3RZepjM4WHTrr6B7Jtkxr0p8e8fzogsq6z/exec";
const TOKEN = "LAB_AMOSTRAS_2026";

export async function enviarParaPlanilha(amostra) {
  await fetch(URL_SCRIPT, {
    method: "POST",
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





