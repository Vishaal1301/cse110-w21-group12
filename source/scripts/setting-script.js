let settingWindow = document.getElementById("setting-window");

let closeSetting = document.getElementsByClassName("close-setting")[0];

const openSetting = () => {
    settingWindow.style.display = "block";
}

const closeSettingButton = () => {
    settingWindow.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == settingWindow) {
        settingWindow.style.display = "none";
    }
}