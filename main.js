const clickr = document.body.querySelectorAll('div');
const gameBoard = document.getElementById('board');
let currentPlayer = "Matt";
let viewModel = [[], [], [], [], [], [], []];
let winnerWinner = false;
let clickedCells = 0;
const board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0]
];
for (let row = 0; row < 7; row++) {
  let column = document.createElement('div');
  column.classList.add('column');
  column.dataset.col = row;
  gameBoard.appendChild(column)
  for (let box = 0; box < 6; box++) {
    let cell = document.createElement('div')
    viewModel[row][box] = cell;
    cell.classList.add("cell");
    cell.dataset.box = box;
    cell.dataset.row = row
    column.appendChild(cell);

  }
}
const disks = document.querySelectorAll(".cell")
const columns = document.getElementsByClassName("column");
for (let c of columns) {
  c.addEventListener("click", playerClick)
}
function playerClick (event) {
  const cell = event.currentTarget;
  let boxData = cell.dataset.col;

  for (let row = 0; row < viewModel[0].length; row++) {
    let cellToBeChecked = viewModel[boxData][row]
    if (cellToBeChecked.className === "cell") {
      if (currentPlayer == "Matt") {
        cellToBeChecked.classList.replace("cell", "red-disk");
        board[row][boxData] = 1;
        currentPlayer = "Zach";
        clickedCells++;
        }

      
      else if (currentPlayer == "Zach") {
        cellToBeChecked.classList.replace("cell", "blue-disk")
        board[row][boxData] = 2;
        currentPlayer = "Matt";
        clickedCells++;
      }
      break
    }
  }  
checkDiag1();
checkDiag2();
checkVert();
horizontalWin();
checkTie();
}


const horizontalWin = function () {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      let position = board[i][j]
      let oneRight = board[i][j + 1]
      let twoRight = board[i][j + 2]
      let threeRight = board[i][j + 3]
      if (position !== 0) {
        if (position === oneRight && position === twoRight && position === threeRight) {
          winnerWinner === true;
          let winMessage = document.getElementById("winMessage");
          let winText = document.createTextNode(currentPlayer + ' wins!')
          winMessage.appendChild(winText)
          for (let c of columns) {
            c.removeEventListener("click", playerClick)
          }                                               
        }
      }
    }
  }
}
const checkVert = function () {
  for (let row = 0; row < 3; row++) {
    for (let cell = 0; cell < 6; cell++) {
      let position = board[row][cell]
      let oneUp = board[row + 1][cell]
      let twoUp = board[row + 2][cell]
      let threeUp = board[row + 3][cell]
      if (position !== 0) {
        if (position === oneUp && position === twoUp && position === threeUp) {
          let winMessage = document.getElementById("winMessage");
          let winText = document.createTextNode(currentPlayer + ' wins!')
          winMessage.appendChild(winText)
          for (let c of columns) {
            c.removeEventListener("click", playerClick)
          }
        }
      }
    }
  }
}
const checkDiag1 = function () {
  for (let row = 0; row < 3; row++) {
    for (let cell = 0; cell <= 3; cell++) {
      let position = board[row][cell]
      let oneDiag = board[row + 1][cell + 1]
      let twoDiag = board[row + 2][cell + 2]
      let threeDiag = board[row + 3][cell + 3]
      if (position !== 0) {
        if (position === oneDiag && position === twoDiag && position === threeDiag) {
          let winMessage = document.getElementById("winMessage");
          let winText = document.createTextNode(currentPlayer + ' wins!')
          winMessage.appendChild(winText)
          for (let c of columns) {
            c.removeEventListener("click", playerClick)
          }

        }
      }
    }
  }
}
  const checkDiag2 = function () {
    for (let row = 3; row < 6; row++) {
      for (let cell = 0; cell <= 3; cell++) {
        let position = board[row][cell];
        let oneDiagy = board[row - 1][cell + 1];
        let twoDiagy = board[row - 2][cell + 2];
        let threeDiagy = board[row - 3][cell + 3];
        if (position !== 0) {
          if (position === oneDiagy && position === twoDiagy && position === threeDiagy) {
            let winMessage = document.getElementById("winMessage");
            let winText = document.createTextNode(currentPlayer + ' wins!')
            winMessage.appendChild(winText)
            for (let c of columns) {
              c.removeEventListener("click", playerClick)
            }
          }
        }
      }
    }
  }
const checkTie = function() {
  for (let i = 0; i < board.length; i++) {
    if(clickedCells > 41 && winnerWinner == false) {
      winnerWinner == true;
      let winMessage = document.getElementById("winMessage");
      let winText = document.createTextNode('You tied!')
      winMessage.appendChild(winText)
      for (let c of columns) {
        c.addEventListener("click", playerClick)
      }
    }
  }
}