const { ipcRenderer } = require("electron");

const Swal = require("sweetalert2");
var bleep = new Audio();
bleep.src = "../../assets/click sound.mp3";

const renameButon = document.getElementById("rename-button");
let loader = document.getElementById("loader");

renameButon.addEventListener("click", () => {
  bleep.play();
  loader.classList.replace("hidden", "visible");
  try {
    ipcRenderer.send("hello", "");
  } catch (err) {
    Swal.fire({
      title: `${err}`,
      showConfirmButton: true,
      width: "850px",
      height: "750px",
      timer: 1000,
    });
  }
});

const changePathButton = document.getElementById("changePath");
changePathButton.addEventListener("click", () => {
  ipcRenderer.send("open-folder");
});

ipcRenderer.on("rename-reply", (event, data) => {
  loader.classList.replace("visible", "hidden");
  Swal.fire({
    title: `${data}`,
    showConfirmButton: true,
    width: "850px",
    height: "750px",
    timer: 1000,
  });
});
