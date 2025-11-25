document.addEventListener("DOMContentLoaded", () => {
  // Comentário
  const comentario = document.getElementById("comentario");
  const btnComentario = document.getElementById("btn-comentario");

  if (comentario && btnComentario) {
    btnComentario.addEventListener("click", () => {
      comentario.value = ""; // limpa texto ao enviar
    });
  }

  // Estrelas (avaliação)
  const estrelas = document.querySelectorAll(".estrelas span");
  const btnAvaliar = document.getElementById("btn-avaliar");
  let avaliacao = 0;
  let enviado = false;

  if (estrelas.length && btnAvaliar) {
    estrelas.forEach((star) => {
      star.addEventListener("click", () => {
        if (enviado) return; // bloqueia alterações após enviar
        avaliacao = parseInt(star.dataset.index, 10);
        estrelas.forEach((s) => {
          const idx = parseInt(s.dataset.index, 10);
          s.classList.toggle("selecionada", idx <= avaliacao);
        });
      });
    });

    btnAvaliar.addEventListener("click", () => {
      if (!enviado) {
        enviado = true;
        btnAvaliar.textContent = "REENVIAR";
      } else {
        enviado = false;
        btnAvaliar.textContent = "ENVIAR";
        estrelas.forEach((s) => s.classList.remove("selecionada"));
        avaliacao = 0;
      }
    });
  }

  // Modal de imagens
  const imagens = document.querySelectorAll(".galeria-img");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const fechar = document.querySelector(".fechar");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  let indexAtual = 0;

  function abrirModal(i) {
    if (!modal || !modalImg) return;
    indexAtual = i;
    modalImg.src = imagens[indexAtual].src;
    modal.style.display = "block";
  }

  function fecharModal() {
    if (!modal) return;
    modal.style.display = "none";
  }

  function trocarImagem(offset) {
    if (!imagens.length || !modalImg) return;
    indexAtual = (indexAtual + offset + imagens.length) % imagens.length;
    modalImg.src = imagens[indexAtual].src;
  }

  if (imagens.length) {
    imagens.forEach((img, i) => {
      img.addEventListener("click", () => abrirModal(i));
    });
  }
  if (fechar) fechar.addEventListener("click", fecharModal);
  if (prev) prev.addEventListener("click", () => trocarImagem(-1));
  if (next) next.addEventListener("click", () => trocarImagem(1));

  // Fecha modal clicando fora da imagem
  if (modal) {
    modal.addEventListener("click", (e) => {
      // fecha se clicar no fundo escuro (não na imagem ou nos botões)
      if (e.target === modal) fecharModal();
    });
  }
});