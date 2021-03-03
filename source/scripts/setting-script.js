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
    if (focusNumber.value > parseInt(focusNumber.getAttribute("max"))) {
        focusNumber.value = focusNumber.getAttribute("max");
        invalidFocusMessage.innerHTML = "Should be > 15 or < 60";
    }
    else if (focusNumber.value < parseInt(focusNumber.getAttribute("min"))) {
        focusNumber.value = focusNumber.getAttribute("min");
    }
    localStorage.setItem("focusTime", focusNumber.value);
});

// short break session length settings
shortBreakNumber.addEventListener("change", () => {
    if (shortBreakNumber.value > parseInt(shortBreakNumber.getAttribute("max"))) {
        shortBreakNumber.value = shortBreakNumber.getAttribute("max");
    }
    else if (shortBreakNumber.value < parseInt(shortBreakNumber.getAttribute("min"))) {
        shortBreakNumber.value = shortBreakNumber.getAttribute("min");
    }
    localStorage.setItem("shortBreakTime", shortBreakNumber.value);
});

// long break session length settings
longBreakNumber.addEventListener("change", () => {
    if (longBreakNumber.value > parseInt(longBreakNumber.getAttribute("max"))) {
        longBreakNumber.value = longBreakNumber.getAttribute("max");
    }
    else if (longBreakNumber.value < parseInt(longBreakNumber.getAttribute("min"))) {
        longBreakNumber.value = longBreakNumber.getAttribute("min");
    }
    localStorage.setItem("longBreakTime", longBreakNumber.value);
});