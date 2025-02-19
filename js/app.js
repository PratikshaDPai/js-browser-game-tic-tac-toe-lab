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

  const board = computeBoard(boardElement);
  const winner = getWinner(board);
  console.log(`winner`, winner);
  if (typeof winner === "string") {
    messageElement.innerText = `🎉 Player ${winner} wins! 🎉`;
  }
}

function computeBoard(boardElement) {
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  for (let i = 0; i < boardElement.children.length; i++) {
    const square = boardElement.children[i];
    board[Math.floor(i / 3)][i % 3] = square.innerText;
  }

  console.log(board);
  return board;
}

function isValidWinner(s) {
  return s === "X" || s === "O";
}

/**
 * @param {string[][]} board
 * @returns {"X" | "O" | undefined}
 */
function getWinner(board) {
  // check rows
  for (let row = 0; row < 3; row++) {
    const firstCellInRow = board[row][0];
    if (!isValidWinner(firstCellInRow)) {
      continue;
    }
    for (let col = 0; col < 3; col++) {
      if (board[row][col] !== firstCellInRow) {
        break;
      }

      if (col === 2) {
        return firstCellInRow;
      }
    }
  }

  // check columns
  for (let col = 0; col < 3; col++) {
    const firstCellInCol = board[0][col];
    if (!isValidWinner(firstCellInCol)) {
      continue;
    }
    for (let row = 0; row < 3; row++) {
      if (board[row][col] !== firstCellInCol) {
        break;
      }

      if (row === 2) {
        return firstCellInCol;
      }
    }
  }

  // check diagonals
  if (
    isValidWinner(board[0][0]) &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0];
  }

  if (
    isValidWinner(board[0][2]) &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2];
  }

  return undefined;
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
