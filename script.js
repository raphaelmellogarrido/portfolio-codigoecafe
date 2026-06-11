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

  // 3. Controlo do envio do formulário via AJAX (Sem recarregar a página)
  if (meuFormulario) {
    meuFormulario.addEventListener("submit", function (evento) {
      // Para o envio padrão do HTML para usarmos o Fetch API
      evento.preventDefault();

      // Validação inteligente do número de telemóvel
      if (iti && !iti.isValidNumber()) {
        alert("Por favor, introduza um número de telemóvel válido para o país selecionado.");
        return; // Trava a execução aqui se o número estiver errado
      }

      // Envia os dados diretamente para o endpoint de AJAX do FormSubmit
      fetch("https://formsubmit.co/ajax/raphaelmellogarrido@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nome: meuFormulario.nome.value,
          email: meuFormulario.email.value,
          tlmv: iti.getNumber(), // Envia o número já com o indicativo internacional (ex: +351...)
          mensagem: meuFormulario.mensagem.value,
        }),
      })
        .then((resposta) => {
          if (resposta.ok) {
            // Se o servidor aceitou, esconde o formulário e mostra a mensagem de sucesso
            meuFormulario.style.display = "none";
            divSucesso.style.display = "block";
          } else {
            alert("Ops! Ocorreu um erro ao enviar. Por favor, tenta novamente.");
          }
        })
        .catch((erro) => {
          alert("Ops! Ocorreu um erro ao enviar. Por favor, tenta novamente.");
          console.error("Erro na requisição:", erro);
        });
    });
  }
});
