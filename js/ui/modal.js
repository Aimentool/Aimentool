const modal = document.getElementById("modal");
const body = document.getElementById("modalBody");

window.openModal = (type) => {
  modal.style.display = "flex";
  body.innerHTML =
    type === "aszf"
      ? "ÁSZF szöveg…"
      : "Adatkezelési tájékoztató…";
};

window.closeModal = () => {
  modal.style.display = "none";
};
