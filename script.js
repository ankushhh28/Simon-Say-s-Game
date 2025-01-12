// **Global Variables and Constants**
let gameSeq = []; // Stores the game's sequence
let userSeq = []; // Stores the user's input sequence
let btns = ["red", "blue", "yellow", "green"]; // Available button colors
let started = false; // Flag to track whether the game has started
let level = 0; // Tracks the current game level
let gamelevel = document.querySelector('#level-status'); // Reference to the level/status display element

// **Event Listeners**
// Start the game when a key is pressed
document.addEventListener("keypress", function () {
    if (started===false) {
        console.log("Game started");
        started = true;
        levelUp(); // Start the first level
    }
});

//** Handle the game level-up process **
function levelUp() {
    userSeq = []; // Clear the user's sequence for the new level
    level++; // Increment the level
    gamelevel.className = "text-lg font-sans text-gray-300 font-bold mb-3 animate-pulse transition"; // Update the styling for the level display
    gamelevel.innerText = `Level ${level}`; // Display the current level

    //** Generate a random button and add it to the game's sequence **
    let randmIndex = Math.floor(Math.random() * 4);
    let randmColor = btns[randmIndex];
    let randmBtn = document.querySelector(`.${randmColor}`);
    gameSeq.push(randmColor);
    console.log(gameSeq); // Debugging output
    gameflash(randmBtn); // Flash the randomly selected button
}

// **Functions**
//** Flash a button for the game's sequence **
function gameflash(btn) {
    btn.classList.add("opacity-15");
    setTimeout(() => btn.classList.remove("opacity-15"), 300)
}


//** Add click event listeners to all buttons **
let allBtns = document.querySelectorAll('.btns');
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

//** Handle user button clicks **
function btnPress() {
    let btn = this; // `this` refers to the clicked button
    userflash(btn); // Flash the button to indicate a user click

    let userColor = btn.getAttribute("id"); // Get the button's color from its ID
    userSeq.push(userColor); // Add the color to the user's sequence
    checkAns(userSeq.length - 1); // Check the user's answer
}

//** Flash a button for the user's interaction **
function userflash(btn) {
    btn.classList.add("opacity-5");
    setTimeout(() => btn.classList.remove("opacity-5"), 300);
}


//** Check if the user's input matches the game's sequence **
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        //** If the user has completed the sequence correctly, move to the next level **
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Wait 1 second before leveling up
        }
    } else {
        //** If the user's input is incorrect, end the game **
        if(started==true){
        gamelevel.innerHTML = `Game Over!  Your Score is ${level} <br><br> Press any key to Restart`;
        setTimeout(reset, 2000); // Reset the game after 2 seconds

        }
    }
}

//** Reset the game to its initial state **
function reset() {
    started = false; // Mark the game as not started
    gameSeq = []; // Clear the game's sequence
    userSeq = []; // Clear the user's sequence
    level = 0; // Reset the level to 0
}


