export function criarModeloAmostra(dados, usuario) {
  return {
    id: dados.id || Date.now().toString(),
    numeroSerie: dados.numeroSerie,
    modelo: dados.modelo,
    status: dados.status,
    observacao: dados.observacao,
    destinacao: dados.destinacao,
    criadoPor: dados.criadoPor || usuario,
    editadoPor: usuario,
  };
}




