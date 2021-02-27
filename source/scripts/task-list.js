var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("add-btn"); //add button
var TasksHolder = document.getElementById("tasks"); //the tasks

var SHOWING = false;

// Instantiate localStorage and unique ID counter
const stor = window.localStorage;
var tasks = JSON.parse(stor.getItem("tasks"));
if(stor.getItem('tasks') == null){
	const tasks = {'mainTask': {'name': null, 
								'completed': false}, 
					'list': []};
	stor.setItem('tasks', JSON.stringify(tasks));
}

// On window load, render all tasks in the task list
window.addEventListener("DOMContentLoaded", function() {
	for(let i = 0; i < tasks.list.length; i++){
		const task = tasks.list[i];
		addTask(task.name, task.checked, tasks.mainTask.name);
	}
});


//New Task List Item
var createNewTaskElement = function(taskString, checked, mainTask) {

	//Create List Item
	var listItem = document.createElement("li");
	listItem.setAttribute('class', 'taskItem');
	// listItem.setAttribute('id', tasks.length);

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox

	//input (text)
	var editInput = document.createElement("input"); // text
	if(mainTask == taskString)
		editInput.style.color = "yellow";

	//button.delete
	var dropdownDiv = document.createElement("div");
	dropdownDiv.setAttribute("class", "dropdown");

	var dropDownSetting = document.createElement("input");
	dropDownSetting.setAttribute("id", "dropDownSetting");
	dropDownSetting.setAttribute("type", "image");
	dropDownSetting.setAttribute("src", "assets/task-item-setting.png");
	dropDownSetting.setAttribute("width", "25");
	dropDownSetting.setAttribute("height", "25");
	
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
	// dropDownContentDiv.appendChild(numPomosLink)

	dropdownDiv.appendChild(dropDownSetting);
	dropdownDiv.appendChild(dropDownContentDiv);


	checkBox.type = "checkbox";
	checkBox.checked = checked;

	editInput.type = "text";
	editInput.value = taskString;
	if(checked){
		editInput.style.textDecoration = 'line-through';

	}


	
	listItem.appendChild(checkBox);
	listItem.appendChild(editInput);
	listItem.appendChild(dropdownDiv);

	return listItem;
}

// Add task to tasklist in localStorage
var storeTask = function(label) {
	console.log("storing")
	const task = {
		name: label,
		checked: false,
	}

	tasks.list.push(task);
	stor.setItem('tasks', JSON.stringify(tasks));
}

// Remove task from tasklist in localStorage
var unstoreTask = function(name) {
	const tasks = JSON.parse(stor.getItem('tasks'));

	for(let index = 0; index < tasks.list.length; index++){
		const task = tasks.list[index];

		if(task['name'] == name){
			tasks.list.splice(index, 1);
			break;
		}
	}

	stor.setItem('tasks', JSON.stringify(tasks));
}

// Update tasklist in localStorage
var updateTask = function(id, state) {

	console.log(id)
	const tasks = JSON.parse(stor.getItem('tasks'));

	for(let index = 0; index < tasks.list.length; index++){
		const task = tasks.list[index];
		console.log(id, state)
		if(task.name == id && task.checked != state){
			task.checked = state;
			break;
		}
	}

	stor.setItem('tasks', JSON.stringify(tasks));
}

//Add a new task
var addTask = function(taskName, checked, mainTask=null) {
	//Create a new list item with the text from #new-task:
	if(!taskName)
		return false;
	console.log("Add task...");
	
	var listItem = createNewTaskElement(taskName, checked, mainTask);
	//Append listItem to TasksHolder
	TasksHolder.appendChild(listItem);

	bindTaskEvents(listItem);

	return true;
}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("new-task");

	var containsClass = listItem.classList.contains("editMode");

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
	let currMainTask = tasks.mainTask;
	
	// If the selected task was already main task, remove main task. Otherwise set it as main task. 
	if(currMainTask.name === text.value) {
		text.style.color = "white";
		currMainTask.name = null
	}
	else{
		console.log("here")
		currMainTask.name = text.value;
		text.style.color = "yellow"
	}

	// Set all other tasks to white
	for (var i = 0; i < TasksHolder.children.length; i++) {
		taskElement = TasksHolder.children[i].children[1]
		if(taskElement.value !== currMainTask.name){
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

	// Update local storage
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

	// show the button on hover
	taskListItem.onmouseover = function(){
		dropdownButton.style.display = "inline-block";
	}

	// hide the button when no longer hovering
	taskListItem.onmouseout = function(){
		dropdownButton.style.display = "none";
	}

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
		taskListItem.classList.toggle("finished");

		if (checkBox.checked){
			taskListItem.style.textDecoration = 'line-through';
			updateTask(text.value, true);
		}
		else{
			taskListItem.style.textDecoration = 'none';
			updateTask(text.value, false);
		}

		
        //update the status of the item
    };
}


//Set the enter key to the addTask function
taskInput.addEventListener("keyup", (event) => {
    if(event.key === 'Enter'){
		tasks = JSON.parse(stor.getItem("tasks"));
        if(tasks.list.length <= 11 && addTask(taskInput.value))
			storeTask(taskInput.value);
		taskInput.value = null;
    }
})

//cycle over TasksHolder ul list items
for (var i = 0; i < TasksHolder.children.length; i++) {

	bindTaskEvents(TasksHolder.children[i]);
}

