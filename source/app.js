import {startStopTimer, updateTimerSettings, isCountdown} from './scripts/clock.js';
const cup = document.getElementById("cup");
const clock = document.getElementById("clock");
const session = document.getElementById("session");
const settings = document.getElementById("settingWindow");
let currentState = session.innerHTML;
let mouseOver = false;

session.onclick = function(){
    updateTimerSettings(clock, 5, 3, 4);
};
window.addEventListener("load", function(){
    updateTimerSettings(clock, localStorage.getItem("focusTime") * 60, localStorage.getItem("shortBreakTime") * 60, localStorage.getItem("longBreakTime") * 60);
});
settings.addEventListener("click", function(){
    updateTimerSettings(clock, localStorage.getItem("focusTime") * 60, localStorage.getItem("shortBreakTime") * 60, localStorage.getItem("longBreakTime") * 60);
})
const updateCoffeeCup = () => {
    if(isCountdown) {
        session.innerHTML = "Stop Brewing?"
        clock.style.color = "red";
    }else{
        session.innerHTML = "Start Brewing!"
        clock.style.color = "green";
    }
}

cup.onmouseenter = () => {
    mouseOver = true;
    updateCoffeeCup();
}
cup.onmouseleave = () => {
    mouseOver = false
    session.innerHTML = currentState;
    clock.style.color = "white";
}

cup.onclick = () => {
    startStopTimer(clock, (state) => {
        currentState = state;
        if(!mouseOver){
            session.innerHTML = state;
        }
    });
    updateCoffeeCup();
}