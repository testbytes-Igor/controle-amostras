const URL =
  "https://script.google.com/macros/s/AKfycbx4dmatOexlBVcxtlSbgi4m7hJBTmXN05Ev7VnE9dieGa6mO3kWpWZqCnqCWnE7cTLK/exec"; // aquele do Apps Script /exec
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
  const data = await resp.json();
  return data;
}








