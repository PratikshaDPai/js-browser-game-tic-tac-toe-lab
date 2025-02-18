/*-------------------------------- Constants --------------------------------*/
const states = ["win", "lose", "tie"];
/*---------------------------- Variables (state) ----------------------------*/
let isX = true; //is player x or o?
/*------------------------ Cached Element References ------------------------*/
const boardElement = document.querySelector(".board");
const messageElement = document.querySelector("#message");
/*-------------------------------- Functions --------------------------------*/
function handleClick() {
  //todo: check if player is x or o and place corresponding symbol on board
}

function renderGameInitial() {
  for (let sqr of boardElement.children) {
    sqr.textContent = "";
  }
  messageElement.innerText = "Begin Game. Player X's Turn";
}
/*----------------------------- Event Listeners -----------------------------*/
document.querySelectorAll(".sqr").forEach(function (sqr) {
  sqr.addEventListener("click", handleClick);
});
