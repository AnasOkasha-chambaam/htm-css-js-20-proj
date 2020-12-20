const toggleBtn = document.getElementById("side-bar-btn"),
  toggleModal = document.getElementById("modal-btn"),
  modal = document.querySelector(".modal-container"),
  closeModal = document.getElementById("close-modal");

document.body.addEventListener("click", (e) => {
  e.preventDefault();
});
toggleBtn.addEventListener("click", (e) => {
  document.body.classList.toggle("bar-toggled");
});
toggleModal.addEventListener("click", (e) => {
  document.body.classList.toggle("modal-toggled");
});
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-container")) {
    document.body.classList.remove("modal-toggled");
  }
});
closeModal.addEventListener("click", (e) => {
  document.body.classList.remove("modal-toggled");
});
