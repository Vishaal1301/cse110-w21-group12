/**
 * Clock module
 * @module modules/clock
*/

const cafeSounds = document.getElementById("cafeSounds");

// Timer setting variables
const POMO_CYCLES = 4; // Default Pomo cycle length
let sessionLengths = [1500, 300, 1500, 300, 1500, 300, 1500, 900];  // {defaultFocusTime: 1500, defaultShortBreak: 300, defaultLongBreak: 900}
let sessionNum = 0; // Default start session is Focus Session

// Global timer variables
let isCountdown = false;
let countdown;

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
}

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
}

/**
 * Starts timer when user manually starts focus session 
 * Changes display of rightSideContainer (the blue box)
 * 
 * @param {object} clock - The HTML element for the clock
 * @param {function} callback - Callback gets called everytime the timer stops, or when the state changes
 */
function startTimer(clock, callback) {
    const clickSound = document.getElementById("clickSound");
    const cafeSounds = document.getElementById("cafeSounds");
    // Get current state based on the current session nunmber
    const state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    document.getElementById("session").innerHTML = state;

    if (state == "Focus Session") {
        clickSound.play();
        cafeSounds.volume = (localStorage.getItem("cafeVolume") / 100);
        cafeSounds.currentTime = 15; //try 14 or 15 for immediate music start
        cafeSounds.play();
        displayFocusContent();
    }

    isCountdown = true;
    let timer = sessionLengths[sessionNum] - 1;
    countdown = setInterval(() => {
        // Update the HTML text
        clock.innerHTML = secondsToString(timer);

        if (--timer < 0) {
            stopTimer(clock, false, callback);
            startTimer(clock, callback);
        }
    }, 1000);
}

/**
 * Stops timer when user manually stops focus session/skips break
 * Changes display of rightSideContainer (the blue box)
 * Plays alarm and updates background audio
 * 
 * @param {object} clock - The HTML element for the clock
 * @param {function} callback - Callback gets called everytime the timer stops, or when the state changes
 */
function stopTimer(clock, resetSkip, callback) {
    // Get current state based on the current session number
    let state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    document.getElementById("session").innerHTML = state;
    const cafeSounds = document.getElementById("cafeSounds");

    //when curr state is focus session, we want to display appropriate are you sure pop ups
    if (state == "Focus Session") {
        displayBreakContent();
        cafeSounds.pause();
        cafeSounds.currentTime = 0;
        //         cafeSounds.currentTime = 0;}, 100); 
        //setTimeout(fadeOutCafeMusic, 1000);
    } else {
        displayFocusContent();
    }

    let alarm;
    let skip = false;

    isCountdown = false;
    if (resetSkip) {
        if (state == "Focus Session") {
            sessionNum = 0;
        } else {
            // If in a break session, skip to next focus session
            sessionNum = ++sessionNum >= sessionLengths.length ? 0 : sessionNum;
            skip = true;
        }
    } else {
        sessionNum = ++sessionNum >= sessionLengths.length ? 0 : sessionNum;

        // Change audio of alarm based on the current state  
        //switch (state) {
        if( state == "Focus Session"){
        //case "Focus Session":
            //alarm = new Audio("./assets/focus.mp3");
            alarm = document.getElementById("alarm");
            alarm.volume = localStorage.getItem("alarmVolume") / 100;
            alarm.currentTime = .5;
            alarm.play();
            //break;
        }
    }

    clearInterval(countdown);
    callback(state);
    clock.innerHTML = secondsToString(sessionLengths[sessionNum]);
    if (skip) {
        startTimer(clock, callback);
    }
}

// Given a number in seconds, return the string equivalent in time format
function secondsToString(time) {
    let minutes, seconds;

    minutes = parseInt(time / 60, 10);
    seconds = parseInt(time % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

/**
 * Update the timer settings, and also resets all sessions. 
 * @param {object} clock - The HTML element for the clock
 * @param {number} focusLength - The length of the focus session, in seconds
 * @param {number} shortBreakLength - The length of the short break length, in seconds
 * @param {number} longBreakLength - The length of the long break length, in seconds
 * @returns {boolean} True if the settings were updated, false if some error occured
 */
function updateTimerSettings(clock, focusLength, shortBreakLength, longBreakLength) {
    // Do nothing if the timer is currently on
    sessionLengths = [];
    for (let i = 0; i < POMO_CYCLES; i++) {
        sessionLengths.push(focusLength);
        if (i < POMO_CYCLES - 1)
            sessionLengths.push(shortBreakLength);
        else
            sessionLengths.push(longBreakLength);
    }

    if(sessionNum %2 == 0){
        clock.innerHTML = secondsToString(sessionLengths[sessionNum]);
    }

    return true;
}

/**
 * When the button is clicked, starts or stops timer based on timer state
 * @param {object} clock - The HTML element for the clock
 * @param {function} callback - Callback gets called everytime the timer stops, or when the state changes
 */
function startStopTimer(clock, callback) {
    if (!isCountdown) {
        startTimer(clock, callback);
        return false;
    }
    else {
        const resetSkip = true;
        stopTimer(clock, resetSkip, callback);
        return true;
    }
}

export { startStopTimer, updateTimerSettings, isCountdown, sessionNum, POMO_CYCLES, sessionLengths, countdown, secondsToString, displayFocusContent, displayBreakContent};