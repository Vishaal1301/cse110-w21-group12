import {startStopTimer, updateTimerSettings, isCountdown} from './scripts/clock.js'
const cup = document.getElementById("cup")
const clock = document.getElementById("clock");
const session = document.getElementById("session");

let currentState = session.innerHTML;
let mouseOver = false;

// session.onclick = function(){
//     updateTimerSettings(clock, 10, 5, 7);
// }
let taskListDiv = document.getElementById("taskListContainer");


const showTasks = () => {
    //hide timer
    let timerDiv = document.getElementById("timerContainer");
    timerDiv.style.display = "none";
    //show task list
    let taskListDiv = document.getElementById("taskListContainer");
    taskListDiv.style.display = "block";
}

const showTimer = () => {
    //hide task list
    let taskListDiv = document.getElementById("taskListContainer");
    taskListDiv.style.display = "none";
    //show timer
    let timerDiv = document.getElementById("timerContainer");
    timerDiv.style.display = "flex";
}

// document.getElementById("timerNav").addEventListener("click", showTimer);
// document.getElementById("tasksNav").addEventListener("click", showTasks);

const updateCoffeeCup = () => {
    if(isCountdown) {
        session.innerHTML = "Stop Brewing?"
        cup.src = "./assets/coffee_red.png";
    }else{
        session.innerHTML = "Start Brewing!"
        cup.src = "./assets/coffee_green.png";
    }
}

cup.onmouseenter = () => {
    mouseOver = true;
    updateCoffeeCup();
}
cup.onmouseleave = () => {
    mouseOver = false
    session.innerHTML = currentState;
    cup.src = "./assets/coffee_default.png";
}

cup.onclick = () => {
    if(!isCountdown){
        showTimer();
        taskListDiv.style.display = "none";
    } else{
        taskListDiv.style.display = "block";
    }
    startStopTimer(clock, (state) => {
        currentState = state;
        if(!mouseOver){
            session.innerHTML = state;
        }
    });
    updateCoffeeCup();
}