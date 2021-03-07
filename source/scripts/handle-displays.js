
let onboardingIcon = document.getElementById("onboardingIcon");
let onboardingContainer = document.getElementById("onboardingContainer");
let rightSideContainer = document.getElementById("rightSideContainer");
let sessionDisplay = document.getElementById("session");

let toggleTasksSettingsDisplay = function() { 
    let navIcon = document.getElementById("navIcon"); 
    let taskListDiv = document.getElementById("taskListContainer");
    let settingsDiv = document.getElementById("settingsContainer");
    let rightHeader = document.getElementById("rightSideHeader");
    let taskInput = document.getElementById("new-task");

    if (navIcon.getAttribute("src") === "./assets/setting-icon.png") {
        taskListDiv.style.display = "none";
        settingsDiv.style.display = "block";  
        rightHeader.innerText = "SETTINGS";
        taskInput.style.visibility = "hidden";
        navIcon.setAttribute("src", "assets/list-icon.png");
    }
    else {
        taskListDiv.style.display = "block";
        settingsDiv.style.display = "none";  
        taskInput.style.visibility = "visible";
        rightHeader.innerText = "TASK LIST";
        navIcon.setAttribute("src", "./assets/setting-icon.png");
    }
}

function toggleOnboardingDisplay() {
    if (onboardingIcon.getAttribute("src") === "./assets/question.png") {
        onboardingContainer.style.display = "block";
        rightSideContainer.style.display = "none";
        sessionDisplay.style.display = "none";
        onboardingIcon.style.width = "10px";
        onboardingIcon.setAttribute("src", "./assets/xicon.png");
        
    }
    else {
        onboardingContainer.style.display = "none";
        rightSideContainer.style.display = "inline-block";
        sessionDisplay.style.display = "block";
        onboardingIcon.setAttribute("src", "./assets/question.png");

    }
}
