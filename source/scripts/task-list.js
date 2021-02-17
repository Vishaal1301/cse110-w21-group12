var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementById("add-btn"); //add button
var TasksHolder = document.getElementById("tasks"); //the tasks

//New Task List Item
var createNewTaskElement = function(taskString) {
	//Create List Item
	var listItem = document.createElement("li");

	//input (checkbox)
	var checkBox = document.createElement("input"); // checkbox
	//label
	var label = document.createElement("label");

	//input (text)
	var editInput = document.createElement("input"); // text

	//button.delete
	var deleteButton = document.createElement("button");


	checkBox.type = "checkbox";
	editInput.type = "text";

	deleteButton.innerText = "Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;

	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(deleteButton);


	return listItem;
}

//Add a new task
var addTask = function() {
	console.log("Add task...");
	//Create a new list item with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value);
	//Append listItem to TasksHolder
	TasksHolder.appendChild(listItem);

	bindTaskEvents(listItem);

    //LOCAL STORAGE HERE:
    //delete the item

	taskInput.value = "";
}

//Edit an existing task
var editTask = function() {
	console.log("Edit task...");

	var listItem = this.parentNode;

	var editInput = listItem.querySelector("input[type=text");
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

    //LOCAL STORAGE HERE
    //delete the item

	//Remove the parent list item from the ul
	ul.removeChild(listItem);
}


var bindTaskEvents = function(taskListItem) {
	console.log("Bind list item events");
	//select taskListItem's children
	var checkBox = taskListItem.querySelector("input[type=checkbox]");
	var deleteButton = taskListItem.querySelector("button.delete");
    var label = taskListItem.querySelector("label");
    var text = taskListItem.querySelector("input[type=text]");


    label.onmouseover = editTask;
    text.onmouseout = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;


	//toggle for checkbox
	checkBox.onchange = () => {
        console.log("Task complete...");
        taskListItem.classList.toggle("finished");

        //LOCAL STORAGE HERE:
        //update the status of the item
    };
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

//Set the enter key to the addTask function
taskInput.addEventListener("keyup", (event) => {
    if(event.key === 'Enter'){
        addTask();
    }
})


//cycle over TasksHolder ul list items
for (var i = 0; i < TasksHolder.children.length; i++) {

	bindTaskEvents(TasksHolder.children[i]);
}

