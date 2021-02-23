let settingWindow = document.getElementById("settingWindow");
let closeSetting = document.getElementsByClassName("closeSetting")[0];
let settingContent = document.getElementById("settingContent");
let cafeVolumeSlider = settingContent.shadowRoot.querySelector('#cafeVolumeSlider');
let cafeVolumeNumber = settingContent.shadowRoot.querySelector('#cafeVolumeNumber');
let alarmVolumeSlider = settingContent.shadowRoot.querySelector('#alarmVolumeSlider');
let alarmVolumeNumber = settingContent.shadowRoot.querySelector('#alarmVolumeNumber');
let focusNumber = settingContent.shadowRoot.querySelector('#focusNumber')
let shortBreakNumber = settingContent.shadowRoot.querySelector('#shortBreakNumber')
let longBreakNumber = settingContent.shadowRoot.querySelector('#longBreakNumber')

// open and close settings popup
const openSetting = () => {
    settingWindow.style.display = "block";
}

const closeSettingButton = () => {
    settingWindow.style.display = "none";
}

window.onclick = function(event) {
    if (settingWindow.contains(event.target) && !settingContent.contains(event.target)) {
        settingWindow.style.display = "none";
    }
}

// cafe volume settings
cafeVolumeSlider.addEventListener('input', () => {
    localStorage.setItem('cafeVolume', cafeVolumeSlider.value);
    cafeVolumeNumber.textContent = cafeVolumeSlider.value;
});

// alarm volume settings
alarmVolumeSlider.addEventListener('input', () => {
    localStorage.setItem('alarmVolume', alarmVolumeSlider.value);
    alarmVolumeNumber.textContent = alarmVolumeSlider.value;
});

// focus session length settings
focusNumber.addEventListener('change', () => {
    if (focusNumber.value > parseInt(focusNumber.getAttribute('max'))) {
        alert('Focus session should be 60min or less');
        focusNumber.value = focusNumber.getAttribute('max');
    }
    else if (focusNumber.value < parseInt(focusNumber.getAttribute('min'))) {
        alert('Focus session should be 15min or more');
        focusNumber.value = focusNumber.getAttribute('min');
    }
    localStorage.setItem('focusTime', focusNumber.value);
})

// short break session length settings
shortBreakNumber.addEventListener('change', () => {
    if (shortBreakNumber.value > parseInt(shortBreakNumber.getAttribute('max'))) {
        alert('Short Break session should be 20 min or less');
        shortBreakNumber.value = shortBreakNumber.getAttribute('max');
    }
    else if (shortBreakNumber.value < parseInt(shortBreakNumber.getAttribute('min'))) {
        alert('Short Break session should be 5 min or more');
        shortBreakNumber.value = shortBreakNumber.getAttribute('min');
    }
    localStorage.setItem('shortBreakTime', shortBreakNumber.value);
})

// long break session length settings
longBreakNumber.addEventListener('change', () => {
    if (longBreakNumber.value > parseInt(longBreakNumber.getAttribute('max'))) {
        alert('Focus session should be 40 min or less');
        longBreakNumber.value = longBreakNumber.getAttribute('max');
    }
    else if (longBreakNumber.value < parseInt(longBreakNumber.getAttribute('min'))) {
        alert('Long Break session should be 10 min or more');
        longBreakNumber.value = longBreakNumber.getAttribute('min');
    }
    localStorage.setItem('longBreakTime', longBreakNumber.value);
})