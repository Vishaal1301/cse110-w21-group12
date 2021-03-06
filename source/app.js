/**
 * App module
 * @module modules/app
*/

//Import clock logic from clock module
import {startStopTimer, updateTimerSettings, hideRightSideMenu, showRightSideMenu, isCountdown, sessionNum, POMO_CYCLES} from "./scripts/clock.js";

const cup = document.getElementById("cup");
const clock = document.getElementById("clock");
const session = document.getElementById("session");
const settings = document.getElementById("settingsContainer");
let currentState = session.innerHTML;
let mouseOver = false;

// session.onclick = function(){
//     updateTimerSettings(clock, 5, 3, 4);
// };

window.addEventListener("load", function(){
    updateTimerSettings(clock, localStorage.getItem("focusTime") * 60, localStorage.getItem("shortBreakTime") * 60, localStorage.getItem("longBreakTime") * 60);
});
settings.addEventListener("click", function(){
    updateTimerSettings(clock, localStorage.getItem("focusTime") * 60, localStorage.getItem("shortBreakTime") * 60, localStorage.getItem("longBreakTime") * 60);
});

/**
 * Update description and styling for cup
 * @param {void}
 * @returns {void}
 */
const updateCoffeeCup = () => {
    if(isCountdown) {
        session.innerHTML = "Stop Brewing?";
        clock.style.color = "red";
    }else{
        session.innerHTML = "Start Brewing!";
        clock.style.color = "green";
    }
};

cup.onmouseenter = () => {
    mouseOver = true;
    updateCoffeeCup();
};

cup.onmouseleave = () => {
    mouseOver = false;
    session.innerHTML = currentState;
    clock.style.color = "white";
};

cup.onclick = () => {
    if(isCountdown){
        const state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";

        if(state == "Focus Session"){
            askResetFocus();
        } 
        else {
            askResetBreak();
        }

    } else{
        changeScreen();
    }
};

function changeScreen(){
    startStopTimer(clock, (state) => {
        currentState = state;
        if(!mouseOver){
            session.innerHTML = state;
        }
    });

    updateCoffeeCup();
}

//are you sure pop up for focus session
function askResetFocus() {
    let rightHeader = document.getElementById("rightSideHeader");
    rightHeader.innerText = "RESET FOCUS?";
    let areYouSureOptions = document.getElementById("areYouSureOptions");
    areYouSureOptions.style.display = "block";
    let focusTask = document.getElementById("focusTask");
    focusTask.style.display = "none";
    let areYouSureYes = document.getElementById("areYouSureYes");
    areYouSureYes.addEventListener("click", changeScreen);
    let areYouSureNo = document.getElementById("areYouSureNo");
    areYouSureNo.addEventListener("click", hideRightSideMenu);
}

//are you sure pop up for break session
function askResetBreak() {
    hideRightSideMenu();
    let rightHeader = document.getElementById("rightSideHeader");
    rightHeader.innerText = "SKIP BREAK?";
    let areYouSureOptions = document.getElementById("areYouSureOptions");
    areYouSureOptions.style.display = "block";
    let focusTask = document.getElementById("focusTask");
    focusTask.style.display = "none";
    let areYouSureYes = document.getElementById("areYouSureYes");
    areYouSureYes.addEventListener("click", changeScreen);
    let areYouSureNo = document.getElementById("areYouSureNo");
    areYouSureNo.addEventListener("click", showRightSideMenu);
}