/**
 * Setting Window/Content Variables
 */
let settingWindow = document.getElementById("settingsContainer");
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

// cafe volume settings
cafeVolumeSlider.addEventListener("input", () => {
    localStorage.setItem("cafeVolume", cafeVolumeSlider.value);
    cafeVolumeNumber.textContent = cafeVolumeSlider.value;
});

// alarm volume settings
alarmVolumeSlider.addEventListener("input", () => {
    localStorage.setItem("alarmVolume", alarmVolumeSlider.value);
    alarmVolumeNumber.textContent = alarmVolumeSlider.value;
});

// focus session length settings
focusNumber.addEventListener("change", () => {
    if (focusNumber.value > parseInt(focusNumber.getAttribute("max")) ||
    focusNumber.value < parseInt(focusNumber.getAttribute("min"))) {
        focusNumber.style.backgroundColor = "red";
        invalidFocusMessage.innerHTML = "Should be >= 15 or =< 60";
    }
    else {
        localStorage.setItem("focusTime", focusNumber.value);
        focusNumber.style.backgroundColor = "#181d28";
        invalidFocusMessage.innerHTML = " ";
    }
});

// short break session length settings
shortBreakNumber.addEventListener("change", () => {
    if (shortBreakNumber.value > parseInt(shortBreakNumber.getAttribute("max")) ||
    shortBreakNumber.value < parseInt(shortBreakNumber.getAttribute("min"))) {
        shortBreakNumber.style.backgroundColor = "red";
        invalidShortBreakMessage.innerHTML = "Should be >= 5 or =< 20";
    }
    else {
        localStorage.setItem("shortBreakTime", shortBreakNumber.value);
        shortBreakNumber.style.backgroundColor = "#181d28";
        invalidShortBreakMessage.innerHTML = " ";
    }
});

// long break session length settings
longBreakNumber.addEventListener("change", () => {
    if (longBreakNumber.value > parseInt(longBreakNumber.getAttribute("max")) ||
    longBreakNumber.value < parseInt(longBreakNumber.getAttribute("min"))) {
        longBreakNumber.style.backgroundColor = "red";
        invalidLongBreakMessage.innerHTML = "Should be >= 10 or =< 40";
    }
    else {
        localStorage.setItem("longBreakTime", longBreakNumber.value);
        longBreakNumber.style.backgroundColor = "#181d28";
        invalidLongBreakMessage.innerHTML = " ";
    }
});