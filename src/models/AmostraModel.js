export function criarModeloAmostra(dados, usuario) {
  const agora = new Date().toISOString();

  return {
    id: dados.id ?? crypto.randomUUID(),

    numeroSerie: dados.numeroSerie ?? "",
    modelo: dados.modelo ?? "",

    status: dados.status ?? "Em teste",
    observacao: dados.observacao ?? "Pendente",
    destinacao: dados.destinacao ?? "",

    criadoPor: dados.criadoPor ?? usuario,
    criadoEm: dados.criadoEm ?? agora,

    editadoPor: usuario,
    editadoEm: agora,
  };
}




