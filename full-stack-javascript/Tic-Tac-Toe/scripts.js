function gameBoard() {
    this.board = []
    this.row = 3
    this.column = 3

    for (let i = 0; i < this.row; i++) {
        let my_row = []
        for (let j = 0; j < this.row; j++) {
            my_row.push(" ")
        }
        this.board.push(my_row)       
    }

    const getBoard = () => board;
}

function Player(name, mark) {
    this.name = name
    this.mark =  mark
    this.isMoveFinished = function () {
        return this.moves > -1;
    }
    this.reduceMove = function () {
        return this.moves--;
    }
    this.makeMove = (position, board) => {
        if (board.board[position[0]][position[1]] === " ") {
            board.board[position[0]][position[1]] = this.mark
            this.reduceMove()
        } else {
            this.makeMove()
        }
    }
}

function gameController() {
    const playerOne = new Player("Player One", "X")
    const playerTwo = new Player("Player Two", "O")

    let myBoard = new gameBoard();
    let board = myBoard.board;
    let playerTurn = playerOne;
    let allMoves = 0;
    let gameOver = false;


    function isWon(player) {
        // check if won horizontally
        let streak = 0;
        for (let i = 0; i < myBoard.row; i++) {
            for (let j = 0; j < myBoard.column; j++) {
                if (player.mark === board[i][j]) {
                    streak++
                }
                if (streak === 3) {
                    return true
                }
            }
            streak = 0                 
        }
        // Check if won vertically  
        streak = 0
        for (let i = 0; i < myBoard.row; i++) {
            for (let j = 0; j < myBoard.column; j++) {
                if (player.mark === board[j][i]) {
                    streak++
                }
                if (streak === 3) {
                    return true
                }
            }
            streak = 0   
        }
        // check if won diagonally  from top left
        streak = 0 
        for (let i = 0; i < myBoard.row; i++) {
            if (player.mark === board[i][i]) {
                streak++
            }
            if (streak === 3) {
                return true
            }
        }
        // check diagonally from top right
        streak = 0
        for (let i = 0; i < myBoard.row; i++) {
            if(player.mark === board[i][2 - i]) {
                streak++
            }
            if (streak === 3) {
                return true
            }
        }
        return false
    }

    // Code to handle Game logic which is behind click events
    allDivs = document.querySelectorAll("div.cell")
    allDivs.forEach(div => {
        div.addEventListener("click", function (event) {
            if (event.target.textContent !== "") {
                return
            }
            let position = event.target.id.split(",")
            
            event.target.textContent = playerTurn.mark
            playerTurn.makeMove(position, myBoard)
            if (isWon(playerTurn)) {
                document.getElementById("result").textContent = `${playerTurn.name} Wins`
                gameOver = true
                return
            }
            if (allMoves === 8) {
                document.getElementById("result").textContent = "Draw"
                gameOver = true
                return
            }
            if (playerTurn === playerOne) {
                playerTurn = playerTwo
            } else {   
                playerTurn = playerOne
            }
            allMoves++;
        })
    });
    if (gameOver === true) {
        return
    }   
}
const game = gameController()
