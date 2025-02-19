/*-------------------------------- Constants --------------------------------*/
const states = ["win", "lose", "tie"];
/*---------------------------- Variables (state) ----------------------------*/
let isX = true; //is player x or o?
let xOrO = "O";
/*------------------------ Cached Element References ------------------------*/
const boardElement = document.querySelector(".board");
const messageElement = document.querySelector("#message");
/*-------------------------------- Functions --------------------------------*/
function handleClick() {
  if (event.currentTarget.innerText !== "") {
    console.log(`handleClick.invalid-click: Square already filled`);
    return;
  }
  messageElement.innerText = `Player ${xOrO}'s Turn`;
  xOrO = isX ? "X" : "O";

  event.currentTarget.innerText = xOrO;
  isX = !isX;

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

document.querySelector("#reset").addEventListener("click", renderGameInitial);

renderGameInitial();
