import {startStopTimer, updateTimerSettings} from './modules/clock.js'
const start = document.getElementById("start")
const clock = document.getElementById("clock");
const set = document.getElementById("set")
const session = document.getElementById("session");

set.onclick = function(){
    updateTimerSettings(clock, 10, 5, 7);
}

start.onclick = function(){
    start.innerHTML = start.innerHTML === "Start" ? "Stop" : "Start";
    startStopTimer(clock, (state) => {
        start.innerHTML = "Start";
        session.innerHTML = state;
    });
}

