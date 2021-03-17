/**
 * Setting Window/Content Variables
 */
import {updateTimerSettings} from "./clock.js";
const clock = document.getElementById("clock");
let settingContent = document.getElementById("settingContent");
let cafeVolumeSlider = settingContent.shadowRoot.querySelector("#cafeVolumeSlider");
let cafeVolumeNumber = settingContent.shadowRoot.querySelector("#cafeVolumeNumber");
let alarmVolumeSlider = settingContent.shadowRoot.querySelector("#alarmVolumeSlider");
let alarmVolumeNumber = settingContent.shadowRoot.querySelector("#alarmVolumeNumber");
let focusNumber = settingContent.shadowRoot.querySelector("#focusNumber");
let shortBreakNumber = settingContent.shadowRoot.querySelector("#shortBreakNumber");
let longBreakNumber = settingContent.shadowRoot.querySelector("#longBreakNumber");
let invalidFocusMessage = settingContent.shadowRoot.querySelector("#invalidFocusMessage");
let invalidShortBreakMessage = settingContent.shadowRoot.querySelector("#invalidShortBreakMessage");
let invalidLongBreakMessage = settingContent.shadowRoot.querySelector("#invalidLongBreakMessage");
let cafeSounds = document.querySelector("#cafeSounds");

// Cafe volume settings
cafeVolumeSlider.addEventListener("input", () => {
    localStorage.setItem("cafeVolume", cafeVolumeSlider.value);
    cafeVolumeNumber.textContent = cafeVolumeSlider.value;
    cafeSounds.volume = cafeVolumeSlider.value / 100;
});
 
// Alarm volume settings
alarmVolumeSlider.addEventListener("input", () => {
    localStorage.setItem("alarmVolume", alarmVolumeSlider.value);
    alarmVolumeNumber.textContent = alarmVolumeSlider.value;
});
 
// Focus session length settings
focusNumber.addEventListener("input", () => {
    if (focusNumber.value > parseInt(focusNumber.getAttribute("max"))) {
        focusNumber.style.backgroundColor = "red";
        invalidFocusMessage.innerHTML = "(maximum: 60)";
    } else if (focusNumber.value < parseInt(focusNumber.getAttribute("min"))) {
        focusNumber.style.backgroundColor = "red";
        invalidFocusMessage.innerHTML = "(minimum: 15)";
    } else {
        localStorage.setItem("focusTime", focusNumber.value);
        focusNumber.style.backgroundColor = "#181d28";
        invalidFocusMessage.innerHTML = " ";
        updateTimerSettings(
            clock,
            localStorage.getItem("focusTime") * 60,
            localStorage.getItem("shortBreakTime") * 60,
            localStorage.getItem("longBreakTime") * 60
        );
    }
});

// Revert invalid input back to the last valid user input when exiting the input field
focusNumber.addEventListener("focusout", () => {
    if (focusNumber.style.backgroundColor == "red") {
        focusNumber.value = localStorage.getItem("focusTime");
        focusNumber.style.backgroundColor = "#181d28";
        invalidFocusMessage.innerHTML = " ";
    }
});
 
// Short break session length settings
shortBreakNumber.addEventListener("input", () => {
    if (shortBreakNumber.value > parseInt(shortBreakNumber.getAttribute("max"))) {
        shortBreakNumber.style.backgroundColor = "red";
        invalidShortBreakMessage.innerHTML = "(maximum: 20)";
    } else if (shortBreakNumber.value < parseInt(shortBreakNumber.getAttribute("min"))) {
        shortBreakNumber.style.backgroundColor = "red";
        invalidShortBreakMessage.innerHTML = "(minimum: 5)";
    } else {
        localStorage.setItem("shortBreakTime", shortBreakNumber.value);
        shortBreakNumber.style.backgroundColor = "#181d28";
        invalidShortBreakMessage.innerHTML = " ";
        updateTimerSettings(
            clock,
            localStorage.getItem("focusTime") * 60,
            localStorage.getItem("shortBreakTime") * 60,
            localStorage.getItem("longBreakTime") * 60
        );
    }
});
 
// Revert invalid input back to the last valid user input when exiting the input field
shortBreakNumber.addEventListener("focusout", () => {
    if (shortBreakNumber.style.backgroundColor == "red") {
        shortBreakNumber.value = localStorage.getItem("shortBreakTime");
        shortBreakNumber.style.backgroundColor = "#181d28";
        invalidShortBreakMessage.innerHTML = " ";
    }
});
 
// Long break session length settings
longBreakNumber.addEventListener("input", () => {
    if (longBreakNumber.value > parseInt(longBreakNumber.getAttribute("max"))) {
        longBreakNumber.style.backgroundColor = "red";
        invalidLongBreakMessage.innerHTML = "(maximum: 40)";
    } else if (longBreakNumber.value < parseInt(longBreakNumber.getAttribute("min"))) {
        longBreakNumber.style.backgroundColor = "red";
        invalidLongBreakMessage.innerHTML = "(minimum: 10)";
    } else {
        localStorage.setItem("longBreakTime", longBreakNumber.value);
        longBreakNumber.style.backgroundColor = "#181d28";
        invalidLongBreakMessage.innerHTML = " ";
        updateTimerSettings(
            clock,
            localStorage.getItem("focusTime") * 60,
            localStorage.getItem("shortBreakTime") * 60,
            localStorage.getItem("longBreakTime") * 60
        );
    }
});
 
// Revert invalid input back to the last valid user input when exiting the input field
longBreakNumber.addEventListener("focusout", () => {
    if (longBreakNumber.style.backgroundColor == "red") {
        longBreakNumber.value = localStorage.getItem("longBreakTime");
        longBreakNumber.style.backgroundColor = "#181d28";
        invalidLongBreakMessage.innerHTML = " ";
    }
});
