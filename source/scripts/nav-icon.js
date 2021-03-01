const toggleTasksSettings = () => {
    let navIcon = document.getElementById("navIcon"); 
    if(navIcon.getAttribute('src') === "assets/setting-icon.jpg"){
        let taskListDiv = document.getElementById("taskListContainer");
        taskListDiv.style.display = "none";

        let settingsDiv = document.getElementById("toolBar");
        settingsDiv.style.display = "block";  
       
        console.log("hello")
        var rightHeader = document.getElementById("rightSideHeader");
        rightHeader.innerText = "SETTINGS"

        openSetting(); //remove after removing this func from js file for settings
        
        navIcon.setAttribute('src', "assets/task-item-setting.png");
    }
    else{
        let taskListDiv = document.getElementById("taskListContainer");
        taskListDiv.style.display = "block";
        
        let settingsDiv = document.getElementById("toolBar");
        settingsDiv.style.display = "none";  

        let rightHeader = document.getElementById("rightSideHeader");
        rightHeader.innerText = "TASK LIST"
        
        navIcon.setAttribute('src', "assets/setting-icon.jpg");
    }
}

// const showTasks = () => {
//     //hide timer
//     let timerDiv = document.getElementById("timerContainer");
//     timerDiv.style.display = "none";
//     //show task list
//     let taskListDiv = document.getElementById("taskListContainer");
//     taskListDiv.style.display = "block";
// }

// const showTimer = () => {
//     //hide task list
//     let taskListDiv = document.getElementById("taskListContainer");
//     taskListDiv.style.display = "none";
//     //show timer
//     let timerDiv = document.getElementById("timerDiv");
//     timerDiv.style.display = "flex";
// }