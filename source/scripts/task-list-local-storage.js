const DEBUG = true;

// Instantiate localStorage and unique ID counter
const stor = window.localStorage;
let tasks = JSON.parse(stor.getItem("tasks"));
if(stor.getItem('tasks') == null){
	const newTasks = {'mainTask': {'name': null, 
								'checked': false, 
								'id': null}, 
					'list': []};
	stor.setItem('tasks', JSON.stringify(newTasks));
	tasks = JSON.parse(stor.getItem("tasks"));
}


/**
 * Helper function to store a new task into local storage
 * @param {string} label - The name of the task
 */
let storeTask = function(label) {
    const tasks = JSON.parse(stor.getItem('tasks'));
	// print to console if DEBUG is enabled
	if(DEBUG)
		console.log("storing")

	const task = {
		name: label,
		checked: false,
		id: tasks.list.length
	}

	tasks.list.push(task);
	stor.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Helper function to remove a new task from local storage
 * @param {number} id - The ID of the task to remove
 */
let unstoreTask = function(id) {
	const tasks = JSON.parse(stor.getItem('tasks'));

	// Find the task ID and remove it from local storage
	for(let index = 0; index < tasks.list.length; index++){
		const task = tasks.list[index];
		if(task.id == id){
			tasks.list.splice(index, 1);
			break;
		}
	}

	// Shift the IDs of all other tasks
	for(let index = 0; index < tasks.list.length; index++){
		const task = tasks.list[index];
		task.id = index;
	}

	// Update main task ID
	if(id == tasks.mainTask.id){
		tasks.mainTask.name = null;
		tasks.mainTask.checked = false;
		tasks.mainTask.id = null;
	}
	else if (id < tasks.mainTask.id){
		console.log("here");
		tasks.mainTask.id = id;
	}

	stor.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Helper function to update the state of checkbox in local storage
 * @param {number} id - The ID of the task to remove
 * @param {number} state - The state of the new checkbox
 */
let updateTask = function(id, state) {
	const tasks = JSON.parse(stor.getItem('tasks'));

	// Find the task by ID and update the checkbox
	for(let index = 0; index < tasks.list.length; index++){
		const task = tasks.list[index];
		if(task.id == id){
			task.checked = state;
			break;
		}
	}

	stor.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Edit the name of an existing task in local storage
 */
let editTask = function() {
	console.log("Edit task...");
	
	const newName = this.value;

	tasks = JSON.parse(stor.getItem("tasks"));

	// Update the task in local storage
	for(let i=0; i < tasks.list.length; i++){
		let task = tasks.list[i]
		if(task.id == this.id){
			task.name = newName;
		}
	}

	// Update local storage
	stor.setItem('tasks', JSON.stringify(tasks));
}

let getMainTask = function() {
    const tasks = JSON.parse(stor.getItem('tasks'));
    return tasks.mainTask;
}

let getTask= function(id) {
    const tasks = JSON.parse(stor.getItem('tasks'));
	for(let i=0; i < tasks.list.length; i++){
		let task = tasks.list[i]
		if(task.id == id){
			return task.name;
		}
	}
    return null;
}

export {storeTask, unstoreTask, updateTask, editTask, getTask, getMainTask}