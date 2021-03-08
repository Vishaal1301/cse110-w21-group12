/**
 * App module
 * @module modules/app
*/

// Import clock logic from clock module
import {startStopTimer, updateTimerSettings, isCountdown, sessionNum, POMO_CYCLES} from "./scripts/clock.js";

// App variables
const cup = document.getElementById("cup");
const clock = document.getElementById("clock");
const session = document.getElementById("session");
const cafeSounds = document.getElementById("cafeSounds");
let currentState = session.innerHTML;
let mouseOver = false;

// Update page setting to user customizations or default on initial render
window.addEventListener("load", function() {
    updateTimerSettings(clock, localStorage.getItem("focusTime") * 60,
        localStorage.getItem("shortBreakTime") * 60,
        localStorage.getItem("longBreakTime") * 60);
    clock.style.display = "block";
    cafeSounds.loop = true;
});

// Update description and styling for cup and the current session text
const updateCoffeeCup = () => {
    // Change clock color and displayed session on user mouse hover
    if (isCountdown) {
        currentState = session.innerHTML;
        if (mouseOver && currentState == "Focus Session") {
            session.innerHTML = "Stop Session?";
            clock.style.color = "red";
        } else if (mouseOver && (currentState == "Short Break" || currentState == "Long Break")) {
            session.innerHTML = "Skip Break?";
            clock.style.color = "red";
        }
    } else {
        if (mouseOver) {
            session.innerHTML = "Start Focus?";
            clock.style.color = "green";
        } else {
            currentState = "Start";
            session.innerHTML = "Start";
            clock.style.color = "white";
        }
    }
};

// Updates the session name and color of the time when mouse hovers over the cup
cup.onmouseenter = () => {
    mouseOver = true;
    updateCoffeeCup();
};

// Resets the session name and color of the time when mouse stops hovering over the cup
cup.onmouseleave = () => {
    mouseOver = false;
    session.innerHTML = currentState;
    clock.style.color = "white";
};

// Updates displays and timer state when user clicks on the cup
cup.onclick = () => {
    if (isCountdown){
        const state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";

        // Show pop up based on the current session
        if (state == "Focus Session"){
            displayAskResetFocus();
        } 
        else {
            displayAskResetBreak();
        }
    } else {
        changeScreen();
        window.player.playVideo();
        cafeSounds.volume = localStorage.getItem("cafeVolume") / 100;
        cafeSounds.play();
    }
};

// Starts/Stops timer depending on clock state and updates coffee cup display and session name accordingly
function changeScreen(){
    startStopTimer(clock, (state) => {
        currentState = state;
        if (!mouseOver){
            session.innerHTML = state;
        }
    });
    currentState = session.innerHTML;
    updateCoffeeCup();
};

/**
 * Display "Are You Sure?" pop up when trying to end focus session
 * Change the current session text accordingly
 */
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
};

/**
 * Display "Are You Sure?"" pop up when trying to end break session
 * Change the current session text accordingly
 * Update eventlisterners 
 */
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
};

/**
 * Show settings menu, task list, and nav icon when in short, long break, or reset timer states
 * Hides "Are You Sure?" display, the task being focused on, and change header to show "TASK LIST"
 */
function displayBreakContent() {
    let rightHeader = document.getElementById("rightSideHeader");
    rightHeader.innerText = "TASK LIST";
    let focusTask = document.getElementById("focusTask");
    focusTask.style.display = "none";
    let newTask = document.getElementById("new-task");
    newTask.style.visibility = "visible";
    let taskListDiv = document.getElementById("taskListContainer");
    taskListDiv.style.display = "block";
    let navIconContainer = document.getElementById("navIconContainer");
    navIconContainer.style.display = "flex";
    let areYouSureOptions = document.getElementById("areYouSureOptions");
    areYouSureOptions.style.display = "none";

    let navIcon = document.getElementById("navIcon");
    navIcon.src = "./assets/setting-icon.png";
};

/**
 * Hide settings menu, task list, nav icon, and "Are You Sure?" display when in focus session
 * Displays selected task and updates rightSideContainer header to "Focus"
 */
function displayFocusContent() {
    // Set the current main task
    let currMainTask = JSON.parse(window.localStorage.getItem("tasks")).mainTask;
    if (currMainTask.name == null) {
        document.getElementById("focusTask").textContent = "No focus task selected";
    } else {
        document.getElementById("focusTask").textContent = currMainTask.name;
    }

    let rightHeader = document.getElementById("rightSideHeader");
    rightHeader.innerText = "FOCUS";
    let focusTask = document.getElementById("focusTask");
    focusTask.style.display = "block";
    let settingsDiv = document.getElementById("settingsContainer");
    settingsDiv.style.display = "none";
    let taskListDiv = document.getElementById("taskListContainer");
    taskListDiv.style.display = "none";
    let navIconContainer = document.getElementById("navIconContainer");
    navIconContainer.style.display = "none";
    let areYouSureOptions = document.getElementById("areYouSureOptions");
    areYouSureOptions.style.display = "none";
};

export {displayFocusContent, displayBreakContent, changeScreen};