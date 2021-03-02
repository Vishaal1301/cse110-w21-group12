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

// Start the timer
function startTimer(clock, callback) {
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
function stopTimer(clock, reset, callback) {
    const state = sessionNum == POMO_CYCLES * 2 - 1 ? "Long Break" : sessionNum % 2 == 0 ? "Focus Session" : "Short Break";
    let alarm;
    isCountdown = false;
    if (reset) {
        sessionNum = 0;
    } else {
        sessionNum = ++sessionNum >= sessionLengths.length ? 0 : sessionNum;
        switch (state) {
        case "Focus Session":
            alarm = new Audio("./assets/focus.mp3");
            alarm.volume = localStorage.getItem("volume") / 100;
            alarm.play();
            break;
        case "Short Break":
            alarm = new Audio("./assets/short.mp3");
            alarm.volume = localStorage.getItem("volume") / 100;
            alarm.play();
            break;
        case "Long Break":
            //alarm = new Audio("./assets/long.mp3");
            alarm.volume = localStorage.getItem("volume") / 100;
            alarm.play();
            break;
        }
    }
    clearInterval(countdown);

    callback(state);
    clock.innerHTML = secondsToString(sessionLengths[sessionNum]);
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
        const reset = true;
        stopTimer(clock, reset, callback);
    }
}

export { startStopTimer, updateTimerSettings, isCountdown };