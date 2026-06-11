// 1. O "BANCO DE DADOS" DE PERGUNTAS (Array de Objetos)
const perguntas = [
  {
    pergunta:
      "Qual é o ingrediente principal dos famosos Ovos Moles de Aveiro?",
    opcoes: [
      "Doce de leite e amêndoas",
      "Gema de ovo e açúcar",
      "Clara de ovo e mel",
    ],
    correta: 1, // Indica que a opção certa é a segunda (lembra-te que no JS a contagem começa em 0)
  },
  {
    pergunta:
      "Como são chamados os barcos tradicionais que navegam na Ria de Aveiro?",
    opcoes: ["Moliceiros", "Gondolas", "Rabelos"],
    correta: 0, // A primeira opção ("Moliceiros") é a correta
  },
  {
    pergunta:
      "Qual destas praias famosas fica na região de Aveiro e tem as casas às riscas coloridas?",
    opcoes: ["Praia da Rocha", "Praia de Espinho", "Praia da Costa Nova"],
    correta: 2, // A terceira opção é a correta
  },
];

// 2. VARIÁVEIS DE CONTROLO DO JOGO (O estado atual do quiz)
let perguntaAtual = 0;
let pontuacao = 0;

// 3. CAPTURAR OS ELEMENTOS DO HTML
const txtPergunta = document.getElementById("perguntaTexto");
const zonaOpcoes = document.getElementById("zonaOpcoes");
const barraProgresso = document.getElementById("barraProgresso");
const ecranJogo = document.getElementById("ecranJogo");
const ecranFim = document.getElementById("ecranFim");
const txtPontuacao = document.getElementById("pontuacaoTexto");

// 4. FUNÇÃO PARA CARREGAR UMA PERGUNTA NO ECRÃ
function carregarPergunta() {
  // Limpar os botões da pergunta anterior
  zonaOpcoes.innerHTML = "";

  // Atualizar a Barra de Progresso
  const percentagem = (perguntaAtual / perguntas.length) * 100;
  barraProgresso.style.width = `${percentagem}%`;

  // Pegar os dados da pergunta atual da nossa lista
  const dadosPergunta = perguntas[perguntaAtual];

  // Injetar o texto da pergunta no HTML
  txtPergunta.innerText = dadosPergunta.pergunta;

  // Criar os botões das opções dinamicamente usando um loop (forEach)
  dadosPergunta.opcoes.forEach((opcao, index) => {
    const botao = document.createElement("button");
    botao.innerText = opcao;
    // Adicionar as classes do Bootstrap e o nosso CSS customizado
    botao.className =
      "btn btn-light btn-opcao text-start py-3 px-4 rounded-3 text-dark";

    // Configurar o que acontece quando o usuário clica nesta opção
    botao.addEventListener("click", () => verificarResposta(index));

    // Colocar o botão dentro da zona de opções no HTML
    zonaOpcoes.appendChild(botao);
  });
}

// 5. FUNÇÃO PARA VERIFICAR SE O USUÁRIO ACERTOU
function verificarResposta(opcaoSelecionada) {
  const dadosPergunta = perguntas[perguntaAtual];
  const botoes = zonaOpcoes.querySelectorAll("button");

  // Desativar todos os botões para o usuário não clicar duas vezes
  botoes.forEach((b) => (b.disabled = true));

  // Se acertou
  if (opcaoSelecionada === dadosPergunta.correta) {
    botoes[opcaoSelecionada].className =
      "btn btn-success text-start py-3 px-4 rounded-3 text-white fw-bold shadow";
    pontuacao++;
  } else {
    // Se errou, deixa o dele vermelho e mostra o verde no correto
    botoes[opcaoSelecionada].className =
      "btn btn-danger text-start py-3 px-4 rounded-3 text-white fw-bold shadow";
    botoes[dadosPergunta.correta].className =
      "btn btn-success text-start py-3 px-4 rounded-3 text-white fw-bold shadow";
  }

  // Esperar 1.5 segundos (1500 milissegundos) para o usuário ver o resultado e passar para a próxima
  setTimeout(() => {
    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
      carregarPergunta();
    } else {
      terminarJogo();
    }
  }, 1500);
}

// 6. FUNÇÃO DE FIM DE JOGO
function terminarJogo() {
  barraProgresso.style.width = "100%"; // Enche a barra no final
  ecranJogo.classList.add("d-none"); // Esconde a zona de perguntas
  ecranFim.classList.remove("d-none"); // Mostra a zona de pontuação final

  txtPontuacao.innerText = `Acertaste ${pontuacao} de ${perguntas.length} perguntas!`;
}

// 7. FUNÇÃO PARA REINICIAR O JOGO
function reiniciarJogo() {
  perguntaAtual = 0;
  pontuacao = 0;
  ecranFim.classList.add("d-none");
  ecranJogo.classList.remove("d-none");
  carregarPergunta();
}

// Inicializar o jogo assim que a página abre
carregarPergunta();
