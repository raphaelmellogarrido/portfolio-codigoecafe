document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".menu-hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      // Liga e desliga a classe "active" na lista de links
      navLinks.classList.toggle("active");

      // Opcional: Animação simples para transformar os 3 riscos num "X"
      hamburger.classList.toggle("toggle");
    });
  }
});
