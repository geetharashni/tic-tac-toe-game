const board = document.getElementById("board");
const cells = Array.from(document.getElementsByClassName("cell"));
const statusText = document.getElementById("status");
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener("click", handleCellClick));

function handleCellClick(e) {
    const index = e.target.dataset.index;
    if (boardState[index] !== "" || checkWinner()) return;
    
    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.style.color = currentPlayer === "X" ? "#e91e63" : "#3f51b5";

    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
    } else if (!boardState.includes("")) {
        statusText.textContent = "It's a tie!";
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "#333";
    });
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}


