let settingWindow = document.getElementById("settingWindow");
let closeSetting = document.getElementsByClassName("closeSetting")[0];  // eslint-disable-line no-unused-vars 
let settingContent = document.getElementById("settingContent");

// open and close settings popup
const openSetting = () => {  // eslint-disable-line no-unused-vars
    settingWindow.style.display = "flex";
};

const closeSettingButton = () => {  // eslint-disable-line no-unused-vars
    settingWindow.style.display = "none";
};

window.onclick = function(event) {
    if (settingWindow.contains(event.target) && !settingContent.contains(event.target)) {
        settingWindow.style.display = "none";
    }
};

// volume settings
let volumeSlider = settingContent.shadowRoot.querySelector("#volumeSlider");
let volumeNumber = settingContent.shadowRoot.querySelector("#volumeNumber");

volumeSlider.addEventListener("input", () => {
    localStorage.setItem("volume", volumeSlider.value);
    volumeNumber.textContent = volumeSlider.value;
});

// focus time settings
let focusNumber = settingContent.shadowRoot.querySelector("#focusNumber");
focusNumber.addEventListener("change", () => {
    if (focusNumber.value > parseInt(focusNumber.getAttribute("max"))) {
        alert("Focus session should be 60min or less");
        focusNumber.value = focusNumber.getAttribute("max");
    }
    else if (focusNumber.value < parseInt(focusNumber.getAttribute("min"))) {
        alert("Focus session should be 15min or more");
        focusNumber.value = focusNumber.getAttribute("min");
    }
    localStorage.setItem("focusTime", focusNumber.value);
});

let shortBreakNumber = settingContent.shadowRoot.querySelector("#shortBreakNumber");
shortBreakNumber.addEventListener("change", () => {
    if (shortBreakNumber.value > parseInt(shortBreakNumber.getAttribute("max"))) {
        alert("Short Break session should be 20 min or less");
        shortBreakNumber.value = shortBreakNumber.getAttribute("max");
    }
    else if (shortBreakNumber.value < parseInt(shortBreakNumber.getAttribute("min"))) {
        alert("Short Break session should be 5 min or more");
        shortBreakNumber.value = shortBreakNumber.getAttribute("min");
    }
    localStorage.setItem("shortBreakTime", shortBreakNumber.value);
});

let longBreakNumber = settingContent.shadowRoot.querySelector("#longBreakNumber");
longBreakNumber.addEventListener("change", () => {
    if (longBreakNumber.value > parseInt(longBreakNumber.getAttribute("max"))) {
        alert("Focus session should be 40 min or less");
        longBreakNumber.value = longBreakNumber.getAttribute("max");
    }
    else if (longBreakNumber.value < parseInt(longBreakNumber.getAttribute("min"))) {
        alert("Long Break session should be 10 min or more");
        longBreakNumber.value = longBreakNumber.getAttribute("min");
    }
    localStorage.setItem("longBreakTime", longBreakNumber.value);
});