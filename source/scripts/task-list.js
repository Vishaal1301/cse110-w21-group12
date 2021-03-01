import {storeTask, unstoreTask, updateTask, editTask, updateMainTask} from "./task-list-local-storage.js";
const MENU_BUTTON_SIZE = 25;
const DEBUG = false;

let taskInput = document.getElementById("new-task"); //new-task
let TasksHolder = document.getElementById("tasks"); //the tasks

// Instantiate localStorage and unique ID counter
const stor = window.localStorage;
let tasks = JSON.parse(stor.getItem("tasks"));
if(stor.getItem("tasks") == null){
    const newTasks = {"mainTask": {"name": null, 
        "checked": false, 
        "id": null}, 
    "list": []};
    stor.setItem("tasks", JSON.stringify(newTasks));
    tasks = JSON.parse(stor.getItem("tasks"));
}

// On window load, render all tasks in the task list
window.addEventListener("DOMContentLoaded", function() {
    for(let i = 0; i < tasks.list.length; i++){
        const task = tasks.list[i];
        addTask(task.name, task.checked, i, tasks.mainTask.id);
    }
});


/**
 * Create a new Task HTML element, and append it to the parent ul element
 * @param {string} taskString - The name of the task
 * @param {boolean} checked - Whether or not the task is checked off
 * @param {number} id - Unique ID to give the task
 * @returns {object} A reference to the new li element
 */
let createNewTaskElement = function(taskString, checked, id) {

    // Create List Item
    let listItem = document.createElement("li");
    listItem.setAttribute("class", "taskItem");

    // Create checkbox
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = checked;

    // Create text element
    let editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskString;
    editInput.id = id;
    if(checkBox.checked){
        editInput.style.textDecoration = "line-through";
    }

    // If this task is the main task, set the color to yellow
    const mainTask = JSON.parse(stor.getItem("tasks")).mainTask.id;
    if(mainTask == id)
        editInput.style.color = "yellow";

    // Create div for the drop down components
    let dropdownDiv = document.createElement("div");
    dropdownDiv.setAttribute("class", "dropdown");

    // Create the drop down menu button
    let dropDownButton = document.createElement("input");
    dropDownButton.setAttribute("id", "dropDownButton");
    dropDownButton.setAttribute("type", "image");
    dropDownButton.setAttribute("src", "assets/task-item-setting.png");
    dropDownButton.setAttribute("width", MENU_BUTTON_SIZE);
    dropDownButton.setAttribute("height", MENU_BUTTON_SIZE);
	
    // Create a div for the drop down content
    let dropDownContentDiv = document.createElement("div");
    dropDownContentDiv.setAttribute("class", "dropdown-content");
	
    // Delete button
    let deleteLink = document.createElement("a");
    deleteLink.setAttribute("id", "deleteButton");
    deleteLink.innerHTML = "Delete";

    // Focus button
    let focusLink = document.createElement("a");
    focusLink.setAttribute("id", "mainTaskSelector");
    focusLink.innerHTML = "Focus";

    dropDownContentDiv.appendChild(deleteLink);
    dropDownContentDiv.appendChild(focusLink);

    dropdownDiv.appendChild(dropDownButton);
    dropdownDiv.appendChild(dropDownContentDiv);

    listItem.appendChild(checkBox);
    listItem.appendChild(editInput);
    listItem.appendChild(dropdownDiv);

    return listItem;
};

/**
 * Add a new task element 
 * @param {string} taskName - The name of the new task
 * @param {boolean} checked - whether or not the task should be checked
 * @param {number} id - The unique ID of the task
 * @returns {boolean} True if sucessful, false otherwise
 */
let addTask = function(taskName, checked, id) {
    // If there is no task name, return false
    if(!taskName)
        return false;

    if(DEBUG)
        console.log("Add task...");
	
    let listItem = createNewTaskElement(taskName, checked, id);
    //Append listItem to TasksHolder
    TasksHolder.appendChild(listItem);

    bindTaskEvents(listItem);

    return true;
};


/**
 * Delete an existing task element
 * @param {string} taskName - The name of the new task
 * @param {boolean} checked - whether or not the task should be checked
 * @param {number} id - The unique ID of the task
 * @returns {boolean} True if sucessful, false otherwise
 */
let deleteTask = function() {
    if(DEBUG)
        console.log("Delete task...");
	
    // Get the task element
    let listItem = this.parentNode.parentNode.parentNode;
    let ul = listItem.parentNode;

    // remove the task element from local storage
    unstoreTask(listItem.children[1].id);

    //Remove the parent list item from the ul
    ul.removeChild(listItem);

    // Shift the ID's of all elements
    let children = ul.children;
    for(let i = 0; i < children.length; i++){
        children[i].children[1].id = i;
    }
};

/**
 * Set a task as the main task
 * @returns {boolean} True if sucessful, false otherwise
 */
let selectMainTask = function(){
    let listItem = this.parentNode.parentNode.parentNode; // <li> taskItem
    let text = listItem.querySelector("input[type=text]");

    if(!listItem || !text)
        return false;

    tasks = JSON.parse(stor.getItem("tasks"));

    // Determine the current main task
    let currMainTask = tasks.mainTask;
	
    // If the selected task was already main task, remove main task. Otherwise set it as main task. 
    if(currMainTask.id === text.id) {
        text.style.color = "white";
        currMainTask.name = null;
        currMainTask.id = null;
    }
    else{
        currMainTask.name = text.value;
        currMainTask.id = text.id;
        text.style.color = "yellow";
    }

    // Set all other tasks to white
    for (let i = 0; i < TasksHolder.children.length; i++) {
        const taskElement = TasksHolder.children[i].children[1];
        if(taskElement.id !== currMainTask.id){
            taskElement.style.color = "white";
        }
    }

    updateMainTask(text);

    return true;
};

/**
 * Helper function for binding all functions to task elements
 * @param {Object} - reference to the task element
 * @returns {boolean} True if sucessful, false otherwise
 */
let bindTaskEvents = function(taskListItem) {

    // let deleteButton = taskListItem.querySelector("button.menu");
    let checkBox = taskListItem.querySelector("input[type=checkbox]");
    let text = taskListItem.querySelector("input[type=text]");
    let dropdownButton = taskListItem.querySelector("#dropDownButton");

    // show the button on hover
    taskListItem.onmouseover = function(){
        dropdownButton.style.display = "inline-block";
    };

    // hide the button when no longer hovering
    taskListItem.onmouseout = function(){
        dropdownButton.style.display = "none";
    };

    let deleteButton = taskListItem.querySelector("#deleteButton");
    let mainTaskSelector = taskListItem.querySelector("#mainTaskSelector");

    mainTaskSelector.onclick = selectMainTask;
    deleteButton.onclick = deleteTask;

    text.onchange = editTask(text.value, text.id);

    //toggle for checkbox
    checkBox.onchange = () => {
        if (checkBox.checked){
            taskListItem.style.textDecoration = "line-through";
            updateTask(text.id, true);
        }
        else{
            taskListItem.style.textDecoration = "none";
            updateTask(text.id, false);
        }
    };
};

//Set the enter key to the addTask function
taskInput.addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        tasks = JSON.parse(stor.getItem("tasks"));
        if(tasks.list.length <= 11 && addTask(taskInput.value, false, tasks.list.length))
            storeTask(taskInput.value);
        taskInput.value = null;
    }
});