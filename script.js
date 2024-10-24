let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'O'; // Player starts first

// Function to handle player move
function playerMove(id) {
    if (board[id] === '' && currentPlayer === 'O') {
        board[id] = 'O'; // Player is 'O'
        document.getElementById(id).innerText = 'O';
        checkForWinner();
        currentPlayer = 'X'; // Switch to computer's turn
        setTimeout(() => computerMove('medium'), 500); // Computer plays after delay
    }
}

// Function to determine if there are moves left
function isMovesLeft(board) {
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') return true;
    }
    return false;
}

// Evaluation function to assign a score
function evaluate(board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === 'X') return 10;
            else if (board[a] === 'O') return -10;
        }
    }
    return 0; // No winner yet
}

// Minimax function
function minimax(board, depth, isMaximizing) {
    let score = evaluate(board);

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;

    if (!isMovesLeft(board)) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                best = Math.max(best, minimax(board, depth + 1, false));
                board[i] = '';
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                best = Math.min(best, minimax(board, depth + 1, true));
                board[i] = '';
            }
        }
        return best;
    }
}

// Function to find the best move for the computer
function findBestMove(board) {
    let bestVal = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            let moveVal = minimax(board, 0, false);
            board[i] = '';

            if (moveVal > bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
}

// Function for computer's move with difficulty levels
function computerMove(difficulty = 'hard') {
    if (difficulty === 'easy') {
        let availableMoves = board.map((val, index) => (val === '' ? index : null)).filter(val => val !== null);
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        board[randomMove] = 'X';
        document.getElementById(randomMove).innerText = 'X';
    } else if (difficulty === 'medium') {
        if (Math.random() < 0.5) {
            let availableMoves = board.map((val, index) => (val === '' ? index : null)).filter(val => val !== null);
            let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            board[randomMove] = 'X';
            document.getElementById(randomMove).innerText = 'X';
        } else {
            let bestMove = findBestMove(board);
            board[bestMove] = 'X';
            document.getElementById(bestMove).innerText = 'X';
        }
    } else {
        let bestMove = findBestMove(board);
        board[bestMove] = 'X';
        document.getElementById(bestMove).innerText = 'X';
    }

    checkForWinner();
    currentPlayer = 'O'; // Switch back to player's turn
}

// Function to check for a winner
function checkForWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(board[a] + ' wins!');
            return resetBoard();
        }
    }

    if (!isMovesLeft(board)) {
        alert('It\'s a draw!');
        return resetBoard();
    }
}

// Function to reset the board
function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerText = '';
    }
    currentPlayer = 'O'; // Player starts again
}

// Add event listeners to each grid cell for player clicks
for (let i = 0; i < 9; i++) {
    document.getElementById(i).addEventListener('click', () => playerMove(i));
}

// Restart game when the restart button is clicked
document.getElementById('restart-btn').addEventListener('click', resetBoard);
// Simple Login System
document.getElementById('login-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation (you can improve this later)
    if (email && password) {
        // Hide login section, show game section
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('game-section').style.display = 'block';
    } else {
        alert('Please enter a valid email and password.');
    }
});
// Assuming you have a variable for the current player
let currentPlayer = 'X'; // X starts the game

// Get all the cells
const cells = document.querySelectorAll('.cell');

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', function() {
        // Check if the cell is already clicked
        if (cell.innerText === '') {
            // Update the cell with the current player's symbol
            cell.innerText = currentPlayer;

            // Add class for color based on the current player
            if (currentPlayer === 'X') {
                cell.classList.add('X'); // Add X class for color
                currentPlayer = 'O'; // Switch player
            } else {
                cell.classList.add('O'); // Add O class for color
                currentPlayer = 'X'; // Switch player
            }

            // Call your existing function to check for a win or draw here
            checkForWin();
        }
    });
});

// Function to check for a win (you should already have this)
function checkForWin() {
    // Your existing win checking logic goes here
}
