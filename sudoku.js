


const sudokuGrid = document.getElementById('sudoku-grid');
const generateBtn = document.getElementById('generate-btn');
const solveBtn = document.getElementById('solve-btn');

// Function to create a 9x9 grid
function createGrid() {
  for (let i = 0; i < 81; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = '1'; // Only one digit allowed
    sudokuGrid.appendChild(input);
  }
}

// Function to generate a new Sudoku puzzle
function generateSudoku() {
  const solvedBoard = generateSolvedBoard();
  const puzzleBoard = createPuzzle(solvedBoard);
  
  const inputs = sudokuGrid.querySelectorAll('input');
  inputs.forEach((input, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    input.value = puzzleBoard[row][col] || ''; // Show empty cells as ''
  });
}

// Function to solve Sudoku
function solveSudoku() {
  const inputs = sudokuGrid.querySelectorAll('input');
  let board = [];
  
  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      const value = inputs[i * 9 + j].value;
      board[i][j] = value ? parseInt(value) : '';
    }
  }

  if (solve(board)) {
    inputs.forEach((input, index) => {
      const row = Math.floor(index / 9);
      const col = index % 9;
      input.value = board[row][col];
    });
  } else {
    alert('No solution exists');
  }
}

// Backtracking Sudoku Solver
function solve(board) {
  const emptyCell = findEmpty(board);
  
  if (!emptyCell) return true; // All cells filled
  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, num, row, col)) {
      board[row][col] = num;
      
      if (solve(board)) return true;
      
      board[row][col] = ''; // Backtrack
    }
  }
  return false;
}

// Find an empty cell
function findEmpty(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === '') {
        return [row, col];
      }
    }
  }
  return null;
}

// Check if placing num at board[row][col] is valid
function isValid(board, num, row, col) {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}

// Generate a fully solved Sudoku board using backtracking
function generateSolvedBoard() {
  const board = generateEmptyBoard();
  fillBoard(board);
  return board;
}

// Fill the board with valid numbers (backtracking algorithm)
function fillBoard(board) {
  const emptyCell = findEmpty(board);
  
  if (!emptyCell) return true;
  const [row, col] = emptyCell;

  const nums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Shuffle for randomness
  for (let num of nums) {
    if (isValid(board, num, row, col)) {
      board[row][col] = num;

      if (fillBoard(board)) return true;

      board[row][col] = ''; // Backtrack
    }
  }
  return false;
}

// Create a puzzle by removing random numbers from a solved board
function createPuzzle(board) {
  const puzzleBoard = board.map(row => row.slice()); // Copy the board
  let cellsToRemove = 40; // Remove 40 cells to create the puzzle
  
  while (cellsToRemove > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzleBoard[row][col] !== '') {
      puzzleBoard[row][col] = ''; // Remove the number
      cellsToRemove--;
    }
  }

  return puzzleBoard;
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate an empty 9x9 board
function generateEmptyBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(new Array(9).fill(''));
  }
  return board;
}

generateBtn.addEventListener('click', generateSudoku);
solveBtn.addEventListener('click', solveSudoku);

// Initialize grid
createGrid();


