/**
 * Settings Logic
 */

 // Setting variables
let settingWindow = document.getElementById("settingWindow");
let closeSetting = document.getElementsByClassName("closeSetting")[0];
let settingContent = document.getElementById("settingContent");
let volumeSlider = settingContent.shadowRoot.querySelector('#volumeSlider');
let volumeNumber = settingContent.shadowRoot.querySelector('#volumeNumber');
let focusNumber = settingContent.shadowRoot.querySelector('#focusNumber');
let shortBreakNumber = settingContent.shadowRoot.querySelector('#shortBreakNumber');
let longBreakNumber = settingContent.shadowRoot.querySelector('#longBreakNumber');

// open settings dialog
const openSetting = () => {
    settingWindow.style.display = "flex";
};

// close settings dialog
const closeSettingButton = () => {
    settingWindow.style.display = "none";
};

window.onclick = function(event) {
    // If the user clicks outside of the Setting dialog, close the dialog
    if (settingWindow.contains(event.target) && !settingContent.contains(event.target)) {
        settingWindow.style.display = "none";
    }
};

volumeSlider.addEventListener('input', () => {
    localStorage.setItem('volume', volumeSlider.value);
    volumeNumber.textContent = volumeSlider.value;
});

focusNumber.addEventListener('change', () => {
    // If the user enters invalid focus session time, alert them
    if (focusNumber.value > parseInt(focusNumber.getAttribute('max'))) {
        alert('Focus session should be 60min or less');
        focusNumber.value = focusNumber.getAttribute('max');
    }
    else if (focusNumber.value < parseInt(focusNumber.getAttribute('min'))) {
        alert('Focus session should be 15min or more');
        focusNumber.value = focusNumber.getAttribute('min');
    }
    localStorage.setItem('focusTime', focusNumber.value);
});

shortBreakNumber.addEventListener('change', () => {
    // If the user enters invalid short break session time, alert them
    if (shortBreakNumber.value > parseInt(shortBreakNumber.getAttribute('max'))) {
        alert('Short Break session should be 20 min or less');
        shortBreakNumber.value = shortBreakNumber.getAttribute('max');
    }
    else if (shortBreakNumber.value < parseInt(shortBreakNumber.getAttribute('min'))) {
        alert('Short Break session should be 5 min or more');
        shortBreakNumber.value = shortBreakNumber.getAttribute('min');
    }
    localStorage.setItem('shortBreakTime', shortBreakNumber.value);
});

longBreakNumber.addEventListener('change', () => {
    // If the user enters invalid long break session time, alert them
    if (longBreakNumber.value > parseInt(longBreakNumber.getAttribute('max'))) {
        alert('Focus session should be 40 min or less');
        longBreakNumber.value = longBreakNumber.getAttribute('max');
    }
    else if (longBreakNumber.value < parseInt(longBreakNumber.getAttribute('min'))) {
        alert('Long Break session should be 10 min or more');
        longBreakNumber.value = longBreakNumber.getAttribute('min');
    }
    localStorage.setItem('longBreakTime', longBreakNumber.value);
});