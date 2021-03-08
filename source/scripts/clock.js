/**
 * Clock module
 * @module modules/clock
*/


// Timer setting variables
const POMO_CYCLES = 4; // Default Pomo cycle length
let sessionLengths = [1500, 300, 1500, 300, 1500, 300, 1500, 900];  // {defaultFocusTime: 1500, defaultShortBreak: 300, defaultLongBreak: 900}
let sessionNum = 0; // Default start session is Focus Session

// Global timer variables
let isCountdown = false;
let countdown;

// Hide settings menu and task list when in focus mode
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

// Show settings menu and task list when in short and long break state and at beginining
function displayBreakContent() {
    let rightHeader = document.getElementById("rightSideHeader");
    rightHeader.innerText = "TASK LIST";
    let areYouSureOptions = document.getElementById("areYouSureOptions");
    areYouSureOptions.style.display = "none";
    let focusTask = document.getElementById("focusTask");
    focusTask.style.display = "none";
    let taskListDiv = document.getElementById("taskListContainer");
    taskListDiv.style.display = "block";
    let navIconContainer = document.getElementById("navIconContainer");
    navIconContainer.style.display = "flex";
    let newTask = document.getElementById("new-task");
    newTask.style.visibility = "visible";

    let navIcon = document.getElementById("navIcon");
    navIcon.src = "./assets/setting-icon.png";
}

/**
 * Start timer logic
 * 
 * default start state is Focus Session
 * if session number is the last (8, index 7) of the pomo cycle:
 *  current state is Long Break
 * else if session number is even:
 *  current state is Focus Session
 * else:
 *  current state is Short Break
 * 
 * @param {object} clock - The HTML element for the clock
 * @param {function} callback - Callback gets called everytime the timer stops, or when the state changes
 */
function startTimer(clock, callback) {
    const state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    document.getElementById("session").innerHTML = state;
    if (state == "Focus Session") {
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
 * top timer logic
 * 
 * default start state is Focus Session
 * if session number is the last (8, index 7) of the pomo cycle:
 *  current state is Long Break
 * else if session number is even:
 *  current state is Focus Session
 * else:
 *  current state is Short Break
 * 
 * @param {object} clock - The HTML element for the clock
 * @param {function} callback - Callback gets called everytime the timer stops, or when the state changes
 */
function stopTimer(clock, resetSkip, callback) {
    let state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    document.getElementById("session").innerHTML = state;
    let alarm;
    let skip = false;
    if (state == "Focus Session") {
        displayBreakContent();
    } else {
        displayFocusContent();
    }

    // Set alarm;
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

        // Change audio based on the current state
        switch (state) {
        case "Focus Session":
            alarm = new Audio("./assets/focus.mp3");
            alarm.volume = localStorage.getItem("alarmVolume") / 100;
            alarm.play();
            break;
        case "Short Break":
            alarm = new Audio("./assets/short.mp3");
            alarm.volume = localStorage.getItem("alarmVolume") / 100;
            alarm.play();
            break;
        case "Long Break":
            alarm = new Audio("./assets/long.mp3");
            alarm.volume = localStorage.getItem("alarmVolume") / 100;
            alarm.play();
            break;
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

export { startStopTimer, updateTimerSettings, isCountdown, sessionNum, POMO_CYCLES, sessionLengths, countdown, secondsToString, displayFocusContent};