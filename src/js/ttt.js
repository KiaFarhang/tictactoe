'use strict';

var turns = 0;

var cells = document.getElementsByClassName('cell');

var playerButton = document.getElementById('playerButton');
var compButton = document.getElementById('compButton');

playerButton.addEventListener('click', playerGame);
compButton.addEventListener('click', compGame);

function playerGame() {
    resetBoard();
    addCellListeners();
    alert("X goes first.");
}

function compGame() {

    var order = (Math.random() < .50);
    resetBoard();
    addCellListeners();
    firstTurn();

    removeCellListeners();

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', compCheck);
    }

    function compCheck(e) {
        if (e.target.className == "checkedx" || e.target.className == "checkedy") {
            //do nothing
        } else {
            draw(e);
        }
    }


    function firstTurn() {
        if (order) {
            alert("You go first.");
        } else {
            alert("The computer goes first.");
            compTurn();
        }
    }

    function compTurn() {
        var rand = Math.round((Math.random() * 8));
        cells[rand].click();
    }

    // function gameLoop(test) {

    //     if (test == true) {
    //         while (turns > 1 && turns < 9 && turns % 2 == 0) {
    //             compTurn();
    //         }
    //     } else {
    //         while (turns > 1 && turns < 9 && turns % 2 != 0) {
    //             compTurn();
    //         }
    //     }
    // }



}

function addCellListeners() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', draw);
    }
}

function removeCellListeners() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', draw);
    }
}

function resetBoard() {

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].firstChild) {
            var child = cells[i].firstChild;
            cells[i].removeChild(child);
            cells[i].className = "cell";
        }
    }

    turns = 0;
}

function draw(e) {
    turns++;

    if (turns % 2 != 0) {
        var x = document.createElement('p');
        x.className = "letter";
        x.appendChild(document.createTextNode('X'));
        e.target.appendChild(x);
        e.target.className += " checkedx";
    } else {
        var o = document.createElement('p');
        o.className = "letter";
        o.appendChild(document.createTextNode('O'));
        e.target.appendChild(o);
        e.target.className += " checkedo";
    }

    e.target.removeEventListener('click', draw);

    if (turns > 4 && turns % 2 != 0) {
        checkWinX();
    } else if (turns > 4 && turns % 2 == 0) {
        checkWinY();
    }

    if (turns == 9) {
        tie();
    }

    function checkWinX() {
        if (cells[0].className == "cell checkedx" && cells[1].className == "cell checkedx" && cells[2].className == "cell checkedx") {
            win();
        } else if (cells[3].className == "cell checkedx" && cells[4].className == "cell checkedx" && cells[5].className == "cell checkedx") {
            win();
        } else if (cells[6].className == "cell checkedx" && cells[7].className == "cell checkedx" && cells[8].className == "cell checkedx") {
            win();
        } else if (cells[0].className == "cell checkedx" && cells[3].className == "cell checkedx" && cells[6].className == "cell checkedx") {
            win();
        } else if (cells[1].className == "cell checkedx" && cells[4].className == "cell checkedx" && cells[7].className == "cell checkedx") {
            win();
        } else if (cells[2].className == "cell checkedx" && cells[5].className == "cell checkedx" && cells[8].className == "cell checkedx") {
            win();
        } else if (cells[0].className == "cell checkedx" && cells[4].className == "cell checkedx" && cells[8].className == "cell checkedx") {
            win();
        } else if (cells[2].className == "cell checkedx" && cells[4].className == "cell checkedx" && cells[6].className == "cell checkedx") {
            win();
        }
    }

    function checkWinY() {
        if (cells[0].className == "cell checkedo" && cells[1].className == "cell checkedo" && cells[2].className == "cell checkedo") {
            win();
        } else if (cells[3].className == "cell checkedo" && cells[4].className == "cell checkedo" && cells[5].className == "cell checkedo") {
            win();
        } else if (cells[6].className == "cell checkedo" && cells[7].className == "cell checkedo" && cells[8].className == "cell checkedo") {
            win();
        } else if (cells[0].className == "cell checkedo" && cells[3].className == "cell checkedo" && cells[6].className == "cell checkedo") {
            win();
        } else if (cells[1].className == "cell checkedo" && cells[4].className == "cell checkedo" && cells[7].className == "cell checkedo") {
            win();
        } else if (cells[2].className == "cell checkedo" && cells[5].className == "cell checkedo" && cells[8].className == "cell checkedo") {
            win();
        } else if (cells[0].className == "cell checkedo" && cells[4].className == "cell checkedo" && cells[8].className == "cell checkedo") {
            win();
        } else if (cells[2].className == "cell checkedo" && cells[4].className == "cell checkedo" && cells[6].className == "cell checkedo") {
            win();
        }
    }

    function win() {
        if (turns % 2 != 0) {
            alert("X wins! Click to play again.");
        } else {
            alert("O wins! Click to play again.");
        }
        resetBoard();
    }

    function tie() {
        alert("Draw. Click to play again.");
        resetBoard();
    }
}
