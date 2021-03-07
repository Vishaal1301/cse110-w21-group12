/**
 * Clock module
 * @module modules/clock
*/

import {displayFocusContent, displayBreakContent} from "../app.js";

// Timer setting variables
const POMO_CYCLES = 4; // Default Pomo cycle length
let autoCycle = true; // Automatically start a new cycle when the current one ends

// {defaultFocusTime: 1500s, defaultShortBreak: 300s, defaultLongBreak: 900s}
let sessionLengths = [1500, 300, 1500, 300, 1500, 300, 1500, 900];  
let sessionNum = 0; // Iterator to keep track of the current session and its length

// Global timer variables
let isCountdown = false;
let countdown;

/**
 * Start timer logic.
 * 
 * @param {object} clock - The HTML element for the clock
 * @param {function} callback - Callback gets called everytime the timer stops, or when the state changes
 */
function startTimer(clock, callback) {
    // Get current state based on the current session nunmber
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
            // If autoCycle is enabled, restart the timer immediately
            if (autoCycle)
                startTimer(clock, callback);
        }
    }, 1000);
}

/**
 * Stops timer when user manually stops focus session/skips break, and gets automatically called whenever timer hits 0
 *  
 * 
 * @param {object} clock - The HTML element for the clock
 * @param {function} callback - Callback gets called everytime the timer stops, or when the state changes
 */
function stopTimer(clock, resetSkip, callback) {
    // Get current state based on the current session number
    let state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    document.getElementById("session").innerHTML = state;

    //when curr state is focus session, we want to display, 
    if (state == "Focus Session") {
        displayBreakContent();
    } else {
        displayFocusContent();
    }

    let alarm;
    let skip = false;

    // Set alarm;
    isCountdown = false;
    if (resetSkip) {
        if (state == "Focus Session") {
            sessionNum = 0;
        } else {
            // If a pomo cycle ends: automatically start the next cycle
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
    }
    else {
        const resetSkip = true;
        stopTimer(clock, resetSkip, callback);
    }
}

export { startStopTimer, updateTimerSettings, isCountdown, sessionNum, POMO_CYCLES, sessionLengths, secondsToString};