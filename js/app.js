/*-------------------------------- Constants --------------------------------*/
/*---------------------------- Variables (state) ----------------------------*/
let isX = true; //is player x or o?
let turn = "O";
let turnCount = 0;
let winner;
let tie = false;
let isBoardLocked = false;
/*------------------------ Cached Element References ------------------------*/
const boardElement = document.querySelector(".board");
const messageElement = document.querySelector("#message");
/*-------------------------------- Functions --------------------------------*/
function handleClick(event, isComputer) {
  if (typeof winner === "string") {
    return;
  }
  if (tie) {
    return;
  }
  if (event.currentTarget.innerText !== "") {
    console.log(`handleClick.invalid-click: Square already filled`);
    return;
  }
  if (isBoardLocked && !isComputer) {
    return;
  }

  event.currentTarget.classList.add("occupied");
  turnCount++;

  messageElement.innerText = `Player ${turn}'s Turn`;
  turn = isX ? "X" : "O";

  event.currentTarget.innerText = turn;
  isX = !isX;

  console.log(`handleClick.successful: Player ${turn}`);

  const board = computeBoard(boardElement);
  winner = getWinner(board);
  console.log(`winner`, winner);
  if (typeof winner === "string") {
    messageElement.innerText = `Player ${winner} wins! 🎉`;
    celebrateWin();
  } else if (turnCount === 9) {
    tie = true;
    messageElement.innerText = "It's a tie!";
  } else if (!isComputer) {
    // Get all the empty squares
    const squares = Array.from(boardElement.children).filter(
      (square) => square.innerText === ""
    );

    // Pick a random square
    const randomIndex = Math.floor(Math.random() * squares.length);
    const newSquare = squares[randomIndex];

    // Lock the board while the computer is "thinking"
    isBoardLocked = true;
    setTimeout(() => {
      handleClick({ currentTarget: newSquare }, true);
      isBoardLocked = false;
    }, 200);
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

function setWinningSquares(coordinates) {
  for (const [row, col] of coordinates) {
    const square = boardElement.children[row * 3 + col];
    square.classList.add("winning");
  }
}

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
        setWinningSquares([
          [row, 0],
          [row, 1],
          [row, 2],
        ]);
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
        setWinningSquares([
          [0, col],
          [1, col],
          [2, col],
        ]);
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
    setWinningSquares([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);
    return board[0][0];
  }

  if (
    isValidWinner(board[0][2]) &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    setWinningSquares([
      [0, 2],
      [1, 1],
      [2, 0],
    ]);
    return board[0][2];
  }

  return undefined;
}

function renderGameInitial() {
  for (let sqr of boardElement.children) {
    sqr.textContent = "";
    sqr.classList.remove("occupied");
    sqr.classList.remove("winning");
  }
  messageElement.innerText = "Begin Game. Player X's Turn";
  isX = true;
  tie = false;
  turnCount = 0;
  winner = undefined;
  turn = "O";
}

function celebrateWin() {
  confetti({
    particleCount: 150, // Number of confetti pieces
    spread: 80, // Spread of confetti
    origin: { y: 0.6 }, // Adjust confetti start position
    colors: ["#ff66b2", "#ffcc00", "#8000ff"], // Custom colors
  });

  // Burst effect
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.5 },
    });
  }, 500);
}

/*----------------------------- Event Listeners -----------------------------*/
document.querySelectorAll(".sqr").forEach(function (sqr) {
  sqr.addEventListener("click", handleClick);
});

document.querySelector("#reset").addEventListener("click", renderGameInitial);

renderGameInitial();
