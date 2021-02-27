import {startStopTimer, updateTimerSettings, isCountdown} from './scripts/clock.js'
const cup = document.getElementById("cup")
const clock = document.getElementById("clock");
const session = document.getElementById("session");

let currentState = session.innerHTML;
let mouseOver = false;

// session.onclick = function(){
//     updateTimerSettings(clock, 10, 5, 7);
// }

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
    startStopTimer(clock, (state) => {
        currentState = state;
        if(!mouseOver){
            session.innerHTML = state;
        }
    });
    updateCoffeeCup();
}