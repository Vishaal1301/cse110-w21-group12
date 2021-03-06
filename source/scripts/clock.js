/**
 * Clock module
 * @module modules/clock
*/

// Timer setting variables
const POMO_CYCLES = 5;
let autoCycle = true;
let sessionLengths = [1500, 300, 1500, 300, 1500, 300, 1500, 300, 1500, 900];
let sessionNum = 0;

// Global timer variables
let isCountdown = false;
let countdown;

//show settings menu and task list when in short and long break state and at beginining
function showRightSideMenu() {
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

    let navIcon = document.getElementById("navIcon");
    navIcon.src = "./assets/setting-icon.png";
}

//hide settings menu and task list when in focus mode
function hideRightSideMenu() {
    let currMainTask = JSON.parse(window.localStorage.getItem("tasks")).mainTask;
    // set focus task name
    if (currMainTask.name == null) {
        document.getElementById("focusTask").textContent = "No task selected";
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

// Start the timer
function startTimer(clock, callback) {
    const state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    if (state == "Focus Session") {
        hideRightSideMenu();
    }

    isCountdown = true;
    let timer = sessionLengths[sessionNum] - 1;
    countdown = setInterval(() => {

        // Update the HTML text
        clock.innerHTML = secondsToString(timer);

        if (--timer < 0) {
            stopTimer(clock, false, callback);

            // If autoCycle is enabled, restart the timer immediately
            if (autoCycle)
                startTimer(clock, callback);
        }
    }, 1000);
}

// Stop the timer
function stopTimer(clock, resetSkip, callback) {
    let state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    let alarm;
    let skip = false;
    if (state == "Focus Session") {
        showRightSideMenu();
    } else {
        hideRightSideMenu();
    }

    // let alarm;
    isCountdown = false;
    if (resetSkip) {
        if (state == "Focus Session") {
            sessionNum = 0;
        } else {
            sessionNum = ++sessionNum >= sessionLengths.length ? 0 : sessionNum;
            skip = true;
        }
    } else {
        sessionNum = ++sessionNum >= sessionLengths.length ? 0 : sessionNum;

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
    if (isCountdown)
        return false;

    sessionNum = 0;
    clock.innerHTML = sessionLengths[sessionNum];

    sessionLengths = [];
    for (let i = 0; i < POMO_CYCLES; i++) {
        sessionLengths.push(focusLength);
        if (i < POMO_CYCLES - 1)
            sessionLengths.push(shortBreakLength);
        else
            sessionLengths.push(longBreakLength);
    }
    clock.innerHTML = secondsToString(sessionLengths[sessionNum]);

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
    }
    else {
        const resetSkip = true;
        stopTimer(clock, resetSkip, callback);
    }
}

export { startStopTimer, updateTimerSettings, hideRightSideMenu, showRightSideMenu, isCountdown, sessionNum, POMO_CYCLES, sessionLengths, secondsToString };