const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('#restart');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWinner();
    changePlayer();
};

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        statusText.textContent = `Jogador ${currentPlayer} venceu!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "Empate!";
        gameActive = false;
        return;
    }
};

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `É a vez do jogador ${currentPlayer}`;
};

const restartGame = () => {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = `É a vez do jogador ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);