const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbzeZpn7zBcZallX_kJXI5tYFUEWW2oR8mcms5fD2O0WnrLyoQXKhheHm9bCacghEoK6/exec";

export async function enviarParaPlanilha(amostra) {
  try {
    await fetch(URL_SCRIPT, {
      method: "POST",
      body: JSON.stringify(amostra),
    });
  } catch (error) {
    console.error("Erro ao enviar para planilha:", error);
  }
}
