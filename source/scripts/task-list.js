var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("add-btn"); //add button
var TasksHolder = document.getElementById("tasks"); //the tasks

// Instantiate localStorage and unique ID counter
const stor = window.localStorage;
var idCounter = stor.getItem('idCounter');

if(idCounter == null){
	idCounter = 0;
	stor.setItem('idCounter', JSON.stringify(idCounter));
}
else {
	idCounter = JSON.parse(idCounter);
}


window.addEventListener("DOMContentLoaded", function(){
	const tasks = JSON.parse(stor.getItem('tasks'));
	console.log(tasks)

	for(let i = 0; i < tasks.length; i++){
		const task = tasks[i]
		addTask(task['name']);
	}
});


//New Task List Item
var createNewTaskElement = function(taskString) {
	//Create List Item
	var listItem = document.createElement("li");
	listItem.setAttribute('class', 'taskItem');
	listItem.setAttribute('id', idCounter);

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox

	//input (text)
	var editInput = document.createElement("input"); // text

	//button.delete
	var deleteButton = document.createElement("button");


	checkBox.type = "checkbox";
	editInput.type = "text";

	deleteButton.innerText = "...";
	deleteButton.className = "menu";

	editInput.value = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(editInput);
	listItem.appendChild(deleteButton);


	return listItem;
}

// Add task to tasklist in localStorage
var storeTask = function(label) {

	console.log(label)

	if(stor.getItem('tasks') == null){
		const tasks = [];
		stor.setItem('tasks', JSON.stringify(tasks));
	}


	const tasks = JSON.parse(stor.getItem('tasks'));

	// console.log(tasks); // Debug check to console
	
	const task = {
		name: label,
		id: idCounter,
		progress: "in progress"
	}

	tasks.push(task);
	stor.setItem('tasks', JSON.stringify(tasks));

	idCounter++;
	stor.setItem('idCounter', JSON.stringify(idCounter));
}

// Remove task from tasklist in localStorage
var unstoreTask = function(id) {
	const tasks = JSON.parse(stor.getItem('tasks'));

	for(let index = 0; index < tasks.length; index++){
		const task = tasks[index];

		if(task['id'] == id){
			tasks.splice(index, 1);
			break;
		}
	}

	stor.setItem('tasks', JSON.stringify(tasks));
}

// Update progress of task in tasklist in localStorage
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
var addTask = function(taskName) {

	if(idCounter > 11){
		return;
	}
	//Create a new list item with the text from #new-task:
	if(!taskName)
		return;
	console.log("Add task...");
	var listItem = createNewTaskElement(taskName);
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
	var label = listItem.querySelector("label");

	var containsClass = listItem.classList.contains("editMode");

	//if the class of the parent is .editMode
	if (containsClass) {
		//Switch from .editMode
		//label text become the input's value
		label.innerText = editInput.value;
	} else {
		//Switch to .editMode
		//input value becomes the label's text
		editInput.value = label.innerText;
	}

	//Toggle .editMode on the list item
	listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function() {
	console.log("Delete task...");
	var listItem = this.parentNode;
	var ul = listItem.parentNode;

	idCounter--;
	stor.setItem('idCounter', JSON.stringify(idCounter));

	unstoreTask(listItem.getAttribute('id'));
    //delete the item
	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}


var bindTaskEvents = function(taskListItem) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var deleteButton = taskListItem.querySelector("button.menu");
    var text = taskListItem.querySelector("input[type=text]");

    text.onmouseout = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;


	//toggle for checkbox
	checkBox.onchange = () => {
        console.log("Task complete...");
        taskListItem.classList.toggle("finished");

		updateTask(taskListItem.getAttribute('id'));
        //update the status of the item
    };
}

//Set the click handler to the addTask function
addButton.addEventListener("click", (e) => {
	addTask(taskInput.value);
	storeTask(taskInput.value);
	taskInput.value = null;
});

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

