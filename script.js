document.addEventListener("DOMContentLoaded", function () {
  // 1. Seleciona os elementos do HTML
  const inputTelemovel = document.querySelector("#tlmv");
  const meuFormulario = document.getElementById("form-contacto");
  const divSucesso = document.getElementById("mensagem-sucesso");

  // 2. Inicializa a biblioteca intl-tel-input
  let iti;
  if (inputTelemovel) {
    iti = window.intlTelInput(inputTelemovel, {
      initialCountry: "pt",
      separateDialCode: true,
      preferredCountries: ["pt", "br", "es"],
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js",
    });
  }

  // 3. Um único evento de Submit para controlar tudo
  if (meuFormulario) {
    meuFormulario.addEventListener("submit", function (evento) {
      // Para imediatamente o envio padrão para podermos validar primeiro
      evento.preventDefault();

      // Validação inteligente usando a própria biblioteca
      // Ela verifica se o número é válido de acordo com o país selecionado
      if (iti && !iti.isValidNumber()) {
        alert("Por favor, introduza um número de telemóvel válido para o país selecionado.");
        return; // Para a execução aqui e não envia o formulário
      }

      // Se passou na validação acima, faz o envio via Fetch API (AJAX)
      const dadosFormulario = new FormData(meuFormulario);
      dadosFormulario.append("form-name", "contacto");

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(dadosFormulario).toString(),
      })
        .then(() => {
          // Se deu certo, esconde o formulário e mostra a mensagem de sucesso!
          meuFormulario.style.display = "none";
          divSucesso.style.display = "block";
        })
        .catch((erro) => {
          alert("Ops! Ocorreu um erro ao enviar. Por favor, tenta novamente.");
          console.error(erro);
        });
    });
  }
});
