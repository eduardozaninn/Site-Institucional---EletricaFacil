const form = document.getElementById("formOrcamento");
const resultado = document.getElementById("resultado");
const servico = document.getElementById("servico");
const inputQuantidade = document.getElementById("quantidade");
const campoQuantidade = document.getElementById("campoQuantidade");
const labelQuantidade = document.getElementById("labelQuantidade");
const cancelarBtn = document.getElementById("cancelarBtn");
const acoesOrcamento = document.getElementById("acoesOrcamento");

const precos = {
  fiacao: { label: "Quantos metros de fiação?", valor: 10 },
  manutencao: { label: "Quantos metros afetados?", valor: 15 },
  tomada: { label: "Quantas tomadas?", valor: 25 },
  interruptor: { label: "Quantos interruptores?", valor: 20 },
  luminaria: { label: "Quantas luminárias?", valor: 30 },
  "3way": { label: "Quantos interruptores 3-way?", valor: 35 },
  quadro: { label: "Quantos quadros?", valor: 300 },
  ManutencaoQuadro: { label: "Quantos quadros para manutenção?", valor: 180 },
  disjuntor: { label: "Quantos disjuntores?", valor: 50 },
  ManutencaoDisjuntor: { label: "Quantos disjuntores para manutenção?", valor: 35 },
  casa: { label: "Quantos metros quadrados a casa possui?", valor: 60 },
};

servico.addEventListener("change", () => {
  const tipo = servico.value;
  if (precos[tipo]) {
    campoQuantidade.style.display = "block";
    labelQuantidade.textContent = precos[tipo].label;
    inputQuantidade.value = "";
  } else {
    campoQuantidade.style.display = "none";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const tipoServico = servico.value;
  const preco = precos[tipoServico];
  const qtd = parseFloat(inputQuantidade.value) || 0;

  if (preco && qtd > 0) {
    const valor = qtd * preco.valor;
    resultado.textContent = `R$ ${valor.toFixed(2).replace(".", ",")}`;
    acoesOrcamento.classList.add("mostrar");
  } else {
    resultado.textContent = `Preencha corretamente os campos para calcular o orçamento.`;
    acoesOrcamento.classList.remove("mostrar");
  }
});

cancelarBtn.addEventListener("click", () => {
  form.reset();
  campoQuantidade.style.display = "none";
  resultado.textContent = "R$ 0,00";
  acoesOrcamento.classList.remove("mostrar");
});