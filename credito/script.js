// 1. CAPTURAR OS ELEMENTOS DO HTML (Criar as pontes)
const inputImovel = document.getElementById("valorImovel");
const inputEntrada = document.getElementById("valorEntrada");
const selectPrazo = document.getElementById("prazoAnos");
const btnCalcular = document.getElementById("btnCalcular");

const txtFinanciamento = document.getElementById("resFinanciamento");
const txtPrestacao = document.getElementById("resPrestacao");
const msgErro = document.getElementById("erroEntrada");

// 2. CRIAR A FUNÇÃO QUE FAZ OS CÁLCULOS
function calcularSimulacao() {
  // Pegar os valores digitados e transformar em números (Float)
  const valorImovel = parseFloat(inputImovel.value);
  const valorEntrada = parseFloat(inputEntrada.value);
  const anos = parseInt(selectPrazo.value);

  // REGRA DE OURO: A entrada mínima em Portugal tem de ser 10%
  const entradaMinima = valorImovel * 0.1;

  if (valorEntrada < entradaMinima) {
    // Se for menor, mostra o erro e para a função
    msgErro.classList.remove("d-none");
    txtFinanciamento.innerText = "0,00 €";
    txtPrestacao.innerText = "0,00 €";
    return; // O 'return' sozinho faz o código parar aqui
  } else {
    // Se estiver tudo bem, esconde a mensagem de erro
    msgErro.classList.add("d-none");
  }

  // CÁLCULO 1: Montante Financiado (O que o banco realmente empresta)
  const montanteFinanciado = valorImovel - valorEntrada;

  // CÁLCULO 2: A Prestação Mensal com Juros (Fórmula de Amortização)
  // Vamos assumir uma Taxa Anual (TAN) de 4% (0.04) como base comercial
  const taxaAnual = 0.04;
  const taxaMensal = taxaAnual / 12;
  const numeroMeses = anos * 12;

  // Fórmula matemática de juros compostos para prestações fixas (Tabela Price)
  // Prestação = Financiamento * [i * (1 + i)^n] / [(1 + i)^n - 1]
  const cima = taxaMensal * Math.pow(1 + taxaMensal, numeroMeses);
  const baixo = Math.pow(1 + taxaMensal, numeroMeses) - 1;
  const prestacaoMensal = montanteFinanciado * (cima / baixo);

  // 3. EXIBIR OS RESULTADOS NO ECRÃ
  // O 'toLocaleString' serve para formatar o número em Euros de Portugal (ex: 120.000,00 €)
  txtFinanciamento.innerText = montanteFinanciado.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
  txtPrestacao.innerText = prestacaoMensal.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
}

// 4. ATIVAR O OUVINTE DE EVENTOS (Ficar atento ao clique do botão)
btnCalcular.addEventListener("click", calcularSimulacao);

// Executar a função uma vez logo ao carregar a página para não começar com zeros
calcularSimulacao();
