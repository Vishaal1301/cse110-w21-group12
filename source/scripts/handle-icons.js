/**
 * Functions to handle display of Task List, Settings, and Onboarding menu
 * @module scripts/handle-icons
*/

let onboardingIcon = document.getElementById("onboardingIcon");
let onboardingContainer = document.getElementById("onboardingContainer");
let rightSideContainer = document.getElementById("rightSideContainer");
let sessionDisplay = document.getElementById("session");
let clock = document.getElementById("clock");

/**
 * Show TaskList or Settings based on the current display
 */
let toggleTasksSettingsDisplay = function() { // eslint-disable-line no-unused-vars
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
    } else {
        taskListDiv.style.display = "block";
        settingsDiv.style.display = "none";  
        taskInput.style.visibility = "visible";
        rightHeader.innerText = "TASK LIST";
        navIcon.setAttribute("src", "./assets/setting-icon.png");
    }
};

/**
 * Show onboarding menu and hide the Task List/Settings, Clock, and the current state text
 */
function displayOnboardingMenu() { // eslint-disable-line no-unused-vars
    clock.style.display = "none";
    onboardingContainer.style.display = "block";
    rightSideContainer.style.display = "none";
    sessionDisplay.style.display = "none";
    onboardingIcon.style.display = "none";
    xicon.style.display = "block"; //eslint-disable-line no-undef
} 

/**
 * Hide onboarding menu and hide the Task List/Settings, Clock, and the current state text
 */
function closeOnboardingMenu() { //eslint-disable-line no-unused-vars
    clock.style.display = "block";
    onboardingContainer.style.display = "none";
    rightSideContainer.style.display = "inline-block";
    sessionDisplay.style.display = "block";
    onboardingIcon.style.display = "block";
    xicon.style.display = "none"; //eslint-disable-line no-undef
} 