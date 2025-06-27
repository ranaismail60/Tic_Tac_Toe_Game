
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6]  // Diagonals
];

let boxes = document.querySelectorAll(".box");
let turn = "X"; 
let gameisover = false;


boxes.forEach(e => {
    e.innerHTML = "";
    e.addEventListener("click", () => {
       
        if (!gameisover && e.innerHTML === "") {
            e.innerHTML = turn; 
            checkWin();
            checkDraw(); 
            changeTurn(); 
        }
    });
});

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        // Move the background for 'O' turn
        document.querySelector(".bg").style.left = "85px"; 
    } else {
        turn = "X"; // Switch back to 'X'
        // Move the background for 'X' turn
        document.querySelector(".bg").style.left = "0px"; 
    }
}

function checkWin() {
    let resultElement = document.getElementById("results"); 
    let playAgainButton = document.getElementById("Play-again"); 

    for (let i = 0; i < winCombinations.length; i++)
         {
        const combo = winCombinations[i];
        const a = boxes[combo[0]].innerHTML;
        const b = boxes[combo[1]].innerHTML;
        const c = boxes[combo[2]].innerHTML;

        if (a !== "" && a === b && a === c) {
            gameisover = true;
            resultElement.innerHTML = `${a} Wins!`; 
            playAgainButton.style.display = "block"; 
          //  playAgainButton.style.marginLeft="200px";
            highlightWinningBoxes(combo); 
            return; 
        }
    }
}

function checkDraw() {
    if (gameisover==true) return; 
    

    let allBoxesFilled = true;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].innerHTML === "") {
            allBoxesFilled = false; 
            break;
        }
    }

    if (allBoxesFilled) {
        gameisover = true;
        document.getElementById("results").innerHTML = "It's a Draw!";
        document.getElementById("Play-again").style.display = "block";
    }
}

function highlightWinningBoxes(combo) {
    combo.forEach(index => {
        boxes[index].style.backgroundColor = "#FFFF00"; 
        boxes[index].style.color = "#000"; 
    });
}


// --- Reset Game Logic ---
document.getElementById("Play-again").addEventListener("click", () => {
    gameisover = false;
    turn = "X"; 
    document.getElementById("results").innerHTML = "X Wins!";
    document.getElementById("results").innerHTML = ""; 
    document.querySelector(".bg").style.left = "0px"; 
    document.getElementById("Play-again").style.display = "none"; 

    boxes.forEach(e => {
        e.innerHTML = ""; // Clear content of all boxes
        e.style.backgroundColor = ""; // Remove background highlight
        e.style.color = ""; // Reset text color
    });
});


document.getElementById("Play-again").style.display = "none";
