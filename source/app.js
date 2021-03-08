/**
 * App module
 * @module modules/app
*/

//Import clock logic from clock module
import {startStopTimer, updateTimerSettings, isCountdown, sessionNum, POMO_CYCLES, displayFocusContent} from "./scripts/clock.js";

const cup = document.getElementById("cup");
const clock = document.getElementById("clock");
const session = document.getElementById("session");
const cafeSounds = document.getElementById("cafeSounds");
let currentState = session.innerHTML;
let mouseOver = false;

window.addEventListener("load", function(){
    updateTimerSettings(clock, localStorage.getItem("focusTime") * 60, localStorage.getItem("shortBreakTime") * 60, localStorage.getItem("longBreakTime") * 60);
    // window.player.setVolume(localStorage.getItem("cafeVolume");
    clock.style.display = "block";
    cafeSounds.loop = true;
});

/**
 * Update description and styling for cup
 * @param {void}
 * @returns {void}
 */
const updateCoffeeCup = () => {
    if(isCountdown) {
        currentState = session.innerHTML;
        if(mouseOver && currentState == "Focus Session") {
            session.innerHTML = "Stop Session?";
            clock.style.color = "red";
        } else if (mouseOver && (currentState == "Short Break" || currentState == "Long Break")) {
            session.innerHTML = "Skip Break?";
            clock.style.color = "red";
        }
    } else {
        if(mouseOver) {
            session.innerHTML = "Start Focus?";
            clock.style.color = "green";
        } else {
            currentState = "Start";
            session.innerHTML = "Start";
            clock.style.color = "white";
        }
    }
};

/**
 * Updates the session name and color of the time when mouse hovers over the cup
 */
cup.onmouseenter = () => {
    mouseOver = true;
    updateCoffeeCup();
};

/**
 * Resets the session name and color of the time when mouse stops hovering over the cup
 */
cup.onmouseleave = () => {
    mouseOver = false;
    session.innerHTML = currentState;
    clock.style.color = "white";
};

/**
 * Updates displays and timer state when user clicks on the cup
 */
cup.onclick = () => {
    if(isCountdown){
        const state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
        if(state == "Focus Session"){
            displayAskResetFocus();
        } 
        else {
            displayAskResetBreak();
        }
    } else {
        changeScreen();
        // window.player.playVideo();
        cafeSounds.volume = localStorage.getItem("cafeVolume") / 100;
        cafeSounds.play();
    }
};

/**
 * Starts / Stops timer depending on clock state
 * Updates coffee cup and session name as well
 */
export function changeScreen(){
    startStopTimer(clock, (state) => {
        currentState = state;
        if(!mouseOver){
            session.innerHTML = state;
        }
    });
    currentState = session.innerHTML;
    updateCoffeeCup();
}

//are you sure pop up for focus session
function displayAskResetFocus() {
    let rightHeader = document.getElementById("rightSideHeader");
    rightHeader.innerText = "RESET FOCUS?";
    let areYouSureOptions = document.getElementById("areYouSureOptions");
    areYouSureOptions.style.display = "block";
    let focusTask = document.getElementById("focusTask");
    focusTask.style.display = "none";
    let areYouSureYes = document.getElementById("areYouSureYes");
    areYouSureYes.addEventListener("click", changeScreen);
    let areYouSureNo = document.getElementById("areYouSureNo");
    areYouSureNo.addEventListener("click", displayFocusContent);
}

//are you sure pop up for break session
function displayAskResetBreak() {
    displayFocusContent();
    let rightHeader = document.getElementById("rightSideHeader");
    rightHeader.innerText = "SKIP BREAK?";
    let areYouSureOptions = document.getElementById("areYouSureOptions");
    areYouSureOptions.style.display = "block";
    let focusTask = document.getElementById("focusTask");
    focusTask.style.display = "none";
    let areYouSureYes = document.getElementById("areYouSureYes");
    areYouSureYes.addEventListener("click", changeScreen);
    let areYouSureNo = document.getElementById("areYouSureNo");
    areYouSureNo.addEventListener("click", displayBreakContent);
}
