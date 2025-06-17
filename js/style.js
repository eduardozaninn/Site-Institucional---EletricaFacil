const form = document.getElementById("formOrcamento");
const resultado = document.getElementById("resultado");
const servico = document.getElementById("servico");
const inputQuantidade = document.getElementById("quantidade");
const campoQuantidade = document.getElementById("campoQuantidade");
const labelQuantidade = document.getElementById("labelQuantidade");
const cancelarBtn = document.getElementById("cancelarBtn");
const acoesOrcamento = document.getElementById("acoesOrcamento");

const nome = document.getElementById("nome");
const cidade = document.getElementById("cidade");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const whatsappBtn = document.getElementById("whatsappBtn");

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
  ManutencaoDisjuntor: {
    label: "Quantos disjuntores para manutenção?",
    valor: 35,
  },
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

    let qntFormatada = `${qtd}`;

    if (tipoServico === "fiacao" || tipoServico === "manutencao") {
      qntFormatada = `${qtd} m`;
    } else if (tipoServico === "casa") {
      qntFormatada = `${qtd} m²`;
    }

    const textoParaServico = servico.options[servico.selectedIndex].text;

    const textoDeCidade = cidade.options[cidade.selectedIndex].text;

    const numeroDoWhatsapp = "5544988297376";

    const mensagem = `Olá! Gostaria de solicitar um orçamento. 😊

  *DADOS DO CLIENTE:*
  👤 *Nome:* ${nome.value}
  🏙️ *Cidade:* ${textoDeCidade}
  📧 *E-mail:* ${email.value}
  📞 *Telefone:* ${telefone.value}  

  *DETALHES DO ORÇAMENTO:*
  🔧 *Serviço:* ${textoParaServico}
  🔢 *Quantidade:* ${qntFormatada}
  💰 *Total Estimado:* ${resultado.textContent}

  Aguardo seu contato para confirmar os detalhes. Obrigado!`;

    const linkDoWhatsapp = `https://api.whatsapp.com/send?phone=${numeroDoWhatsapp}&text=${encodeURIComponent(
      mensagem
    )}`;
    whatsappBtn.href = linkDoWhatsapp;
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

gsap.registerPlugin(ScrollToPlugin);

const NavLinks = document.querySelectorAll(".rodape-links a.nav-link");

NavLinks.forEach((Link) => {
  Link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetID = this.getAttribute("href");

    const animOptions = {
      duration: 1.8,
      scrollTo: targetID,
      ease: "power2.inOut",
    };

    if (targetID === "#Orcamento") {
      animOptions.ease = "bounce.out";
      animOptions.duration = 2.5;
    }

    gsap.to(window, animOptions);
  });
});
