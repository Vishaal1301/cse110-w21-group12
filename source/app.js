import {startStopTimer, updateTimerSettings} from './scripts/clock.js'
const cup = document.getElementById("cup")
const clock = document.getElementById("clock");
const session = document.getElementById("session");

clock.onclick = function(){
    startStopTimer(clock, (state) => {
        session.innerHTML = state;
    });
}
   

cup.onclick = function(){
    startStopTimer(clock, (state) => {
        session.innerHTML = state;
    });
}

