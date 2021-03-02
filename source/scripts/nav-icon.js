const toggleTasksSettings = () => {
    let navIcon = document.getElementById("navIcon"); 
    if(navIcon.getAttribute('src') === "assets/setting-icon.png"){
        let taskListDiv = document.getElementById("taskListContainer");
        taskListDiv.style.display = "none";

        let settingsDiv = document.getElementById("settingsContainer");
        settingsDiv.style.display = "block";  
       
        var rightHeader = document.getElementById("rightSideHeader");
        rightHeader.innerText = "SETTINGS"

        let taskInput = document.getElementById("new-task");
        taskInput.style.visibility = "hidden";
        
        navIcon.setAttribute('src', "assets/list-icon.png");
    }
    else{
        let taskListDiv = document.getElementById("taskListContainer");
        taskListDiv.style.display = "block";
        
        let settingsDiv = document.getElementById("settingsContainer");
        settingsDiv.style.display = "none";  

        let taskInput = document.getElementById("new-task");
        taskInput.style.visibility = "visible";

        let rightHeader = document.getElementById("rightSideHeader");
        rightHeader.innerText = "TASK LIST"
        
        navIcon.setAttribute('src', "assets/setting-icon.png");
    }
}