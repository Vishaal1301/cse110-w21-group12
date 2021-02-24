var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("add-btn"); //add button
var TasksHolder = document.getElementById("tasks"); //the tasks

var SHOWING = false;

// Instantiate localStorage and unique ID counter
const stor = window.localStorage;
var tasks = JSON.parse(stor.getItem("tasks"));
if(stor.getItem('tasks') == null){
	const tasks = [];
	stor.setItem('tasks', JSON.stringify(tasks));
}

// var tasks.length = stor.getItem('tasks').length;

// if(tasks.length == null){
// 	tasks.length = 0;
// 	stor.setItem('tasks.length', JSON.stringify(idCounter));
// }
// else {
// 	idCounter = JSON.parse(idCounter);
// }


window.addEventListener("DOMContentLoaded", function() {
	for(let i = 0; i < tasks.length; i++){
		const task = tasks[i];
		addTask(task['name'], task['mainTask']);
	}
});


//New Task List Item
var createNewTaskElement = function(taskString, mainTask) {
	//Create List Item
	var listItem = document.createElement("li");
	listItem.setAttribute('class', 'taskItem');
	// listItem.setAttribute('id', tasks.length);

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox

	//input (text)
	var editInput = document.createElement("input"); // text
	if(mainTask)
		editInput.style.color = "yellow";

	//button.delete
	var dropdownDiv = document.createElement("div");
	dropdownDiv.setAttribute("class", "dropdown");

	
	var dropDownSetting = document.createElement("input");
	dropDownSetting.setAttribute("id", "dropDownSetting");
	dropDownSetting.setAttribute("type", "image");
	dropDownSetting.setAttribute("src", "assets/task-item-setting.png");
	dropDownSetting.setAttribute("width", "20");
	dropDownSetting.setAttribute("height", "20");
	
	var dropDownContentDiv = document.createElement("div");
	dropDownContentDiv.setAttribute("class", "dropdown-content");
	
	
	var deleteLink = document.createElement("a");
	deleteLink.setAttribute("id", "deleteButton");
	deleteLink.innerHTML = "Delete";

	var focusLink = document.createElement("a");
	focusLink.setAttribute("id", "mainTaskSelector");
	focusLink.innerHTML = "Focus";

	var numPomosLink = document.createElement("a");
	numPomosLink.setAttribute("id", "pomoCycles");
	numPomosLink.innerHTML = "1";

	dropDownContentDiv.appendChild(deleteLink)
	dropDownContentDiv.appendChild(focusLink)
	dropDownContentDiv.appendChild(numPomosLink)

	dropdownDiv.appendChild(dropDownSetting);
	dropdownDiv.appendChild(dropDownContentDiv);


	checkBox.type = "checkbox";
	editInput.type = "text";
	editInput.value = taskString;

	
	listItem.appendChild(checkBox);
	listItem.appendChild(editInput);
	listItem.appendChild(dropdownDiv);

	return listItem;
}

// Add task to tasklist in localStorage
var storeTask = function(label) {
	const task = {
		name: label,
		progress: "in progress",
		mainTask: false
	}

	tasks.push(task);
	stor.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from tasklist in localStorage
var unstoreTask = function(name) {
	const tasks = JSON.parse(stor.getItem('tasks'));

	for(let index = 0; index < tasks.length; index++){
		const task = tasks[index];

		if(task['name'] == name){
			tasks.splice(index, 1);
			break;
		}
	}

	console.log(tasks);

	stor.setItem('tasks', JSON.stringify(tasks));
}

// Update tasklist in localStorage
var updateTask = function(id) {
	const tasks = JSON.parse(stor.getItem('tasks'));

	for(let index = 0; index < tasks.length; index++){
		const task = tasks[index];

		if(task['id'] == id){
			task['progress'] = "finished";
			break;
		}
	}

	stor.setItem('tasks', JSON.stringify(tasks));
}

//Add a new task
var addTask = function(taskName, mainTask=false) {
	tasks = JSON.parse(stor.getItem("tasks"));
	if(tasks.length > 11){
		return;
	}
	//Create a new list item with the text from #new-task:
	if(!taskName)
		return;
	console.log("Add task...");
	var listItem = createNewTaskElement(taskName, mainTask);
	//Append listItem to TasksHolder
	TasksHolder.appendChild(listItem);

	bindTaskEvents(listItem);
    //delete the item

}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("new-task");

	var containsClass = listItem.classList.contains("editMode");

	// //if the class of the parent is .editMode
	// if (containsClass) {
	// 	//Switch from .editMode
	// 	//label text become the input's value
	// 	label.value = editInput.value;
	// } else {
	// 	//Switch to .editMode
	// 	//input value becomes the label's text
	// 	editInput.value = label.value;
	// }

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode.parentNode.parentNode;
	console.log(listItem);
	var ul = listItem.parentNode;

	tasks = JSON.parse(stor.getItem("tasks"));
	// stor.setItem('tasks.length', JSON.stringify(tasks.length));

	unstoreTask(listItem.children[1].value);

	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}

var selectMainTask = function(){
	var listItem = this.parentNode.parentNode.parentNode; // <li> taskItem
	var text = listItem.querySelector("input[type=text]");

	tasks = JSON.parse(stor.getItem("tasks"));

	// Determine the current main task
	let currMainTask = null;

	for(let i = 0; i < tasks.length; i++) {
		let task = tasks[i]
		// case1: no main task selected in tasks 
			// find the corresponding task in tasks, set 
		// case2: one main task is selected in tasks, user tries to select a different task as main
			// TODO: need to include this
		// case3: one main task is selected in tasks, user tries to select the same task

		if(task.name === text.value && task.mainTask === true) {
			task.mainTask = false;
			text.style.color = "white";
			break;
		}
		else if(task.name == text.value) {
			task.mainTask = true;
			currMainTask = task.name;
			text.style.color = "yellow"
			break;
		}
	}

	// Set all other tasks to white
	for (var i = 0; i < TasksHolder.children.length; i++) {
		taskElement = TasksHolder.children[i].children[1]
		if(taskElement.value !== currMainTask){
			taskElement.style.color = "white"
		}
	}

	// Update the tasks in local storage
	for(let i=0; i < tasks.length; i++){
		let task = tasks[i]
		if(task.name !== currMainTask){
			task.mainTask = false;
		}
	}

	stor.setItem('tasks', JSON.stringify(tasks));
	
}

var bindTaskEvents = function(taskListItem) {
	// console.log("Bind list item events");
	//select taskListItem's children

	// var deleteButton = taskListItem.querySelector("button.menu");
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var text = taskListItem.querySelector("input[type=text]");
	var dropdownButton = taskListItem.querySelector("#dropDownSetting");
	var dropDownContent = taskListItem.querySelector(".dropdown-content");

	var deleteButton = taskListItem.querySelector("#deleteButton");
	var mainTaskSelector = taskListItem.querySelector("#mainTaskSelector");

	mainTaskSelector.onclick = selectMainTask;
	deleteButton.onclick = deleteTask;
	// dropdownButton.onclick = function() {
	// 	SHOWING = true;
	// 	console.log("test");
	// 	dropDownContent.style.display = "block"
	// }

    text.onmouseout = editTask;

	//bind deleteTask to delete button


	//toggle for checkbox
	checkBox.onchange = () => {
        console.log("Task complete...");
        taskListItem.classList.toggle("finished");

		updateTask(taskListItem.getAttribute('id'));
        //update the status of the item
    };
}


//Set the enter key to the addTask function
taskInput.addEventListener("keyup", (event) => {
    if(event.key === 'Enter'){
        addTask(taskInput.value);
		storeTask(taskInput.value);
		taskInput.value = null;
    }
})


//cycle over TasksHolder ul list items
for (var i = 0; i < TasksHolder.children.length; i++) {

	bindTaskEvents(TasksHolder.children[i]);
}

