/*-------------------------------- Constants --------------------------------*/
const states = ["win", "lose", "tie"];
/*---------------------------- Variables (state) ----------------------------*/
let isX = true; //is player x or o?
/*------------------------ Cached Element References ------------------------*/
const boardElement = document.querySelector(".board");
const messageElement = document.querySelector("#message");
/*-------------------------------- Functions --------------------------------*/
function handleClick() {
  if (event.currentTarget.innerText !== "") {
    console.log(`handleClick.invalid-click: Square already filled`);
    return;
  }
  if (isX) {
    event.currentTarget.innerText = "X";
    isX = false;
  } else {
    event.currentTarget.innerText = "O";
    isX = true;
  }
  let xOrO = isX ? "O" : "X";
  console.log(`handleClick.successful: Player ${xOrO}`);
}

function renderGameInitial() {
  for (let sqr of boardElement.children) {
    sqr.textContent = "";
  }
  messageElement.innerText = "Begin Game. Player X's Turn";
  isX = true;
}
/*----------------------------- Event Listeners -----------------------------*/
document.querySelectorAll(".sqr").forEach(function (sqr) {
  sqr.addEventListener("click", handleClick);
});
