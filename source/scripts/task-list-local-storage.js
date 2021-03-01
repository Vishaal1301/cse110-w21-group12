/**
 * Module handling all local storage operations for task list
 * @module scripts/task-list-local-storage
*/

// Instantiate localStorage and unique ID counter
const stor = window.localStorage;
let tasks = JSON.parse(stor.getItem("tasks"));

/**
 * Helper function to store a new task into local storage
 * @param {string} label - The name of the task
 * @returns {object} - The task object that was added to local storage
 */
let storeTask = function(label) {
    const tasks = JSON.parse(stor.getItem("tasks"));

    const task = {
        name: label,
        checked: false,
        id: tasks.list.length
    };

    tasks.list.push(task);
    stor.setItem("tasks", JSON.stringify(tasks));
    return task;
};

/**
 * Helper function to remove a new task from local storage
 * @param {number} id - The ID of the task to remove
 * @returns {boolean} - True if removing was sucessful, false otherwise
 */
let unstoreTask = function(id) {
    const tasks = JSON.parse(stor.getItem("tasks"));
    let foundTask = false;

    // Find the task ID and remove it from local storage
    for(let index = 0; index < tasks.list.length; index++){
        const task = tasks.list[index];
        if(task.id == id){
            tasks.list.splice(index, 1);
            foundTask = true;
            break;
        }
    }

    if (!foundTask)
        return false;

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
        tasks.mainTask.id = id;
    }

    stor.setItem("tasks", JSON.stringify(tasks));
    return true;
};

/**
 * Helper function to update the state of checkbox in local storage
 * @param {number} id - The ID of the task to update
 * @param {number} state - The state of the new checkbox
 * @returns {boolean} - true if update was sucessful, false otherwise
 */
let updateTask = function(id, state) {
    const tasks = JSON.parse(stor.getItem("tasks"));

    // Find the task by ID and update the checkbox
    for(let index = 0; index < tasks.list.length; index++){
        const task = tasks.list[index];
        if(task.id == id){
            task.checked = state;
            stor.setItem("tasks", JSON.stringify(tasks));
            return true;
        }
    }
    return false;

};

/**
 * Edit the name of an existing task in local storage
 * @param {string} name - The new name of the task
 * @param {number} id - The id of the task
 * @returns {boolean} true if edit was sucessful, false otherwise
 */
let editTask = function(name, id) {	
    const newName = name;

    tasks = JSON.parse(stor.getItem("tasks"));

    // Update the task in local storage
    for(let i=0; i < tasks.list.length; i++){
        let task = tasks.list[i];
        if(task.id == id){
            task.name = newName;
            stor.setItem("tasks", JSON.stringify(tasks));
            return true;
        }
    }

    return false;
};

/**
 * Updates the current main task in local storage
 * @param {object} mainTask - A reference to the task that is selected
 */
let updateMainTask = function(mainTask){
    tasks = JSON.parse(stor.getItem("tasks"));
    let currMainTask = tasks.mainTask;

    if(currMainTask.id != null && currMainTask.id === mainTask.id) {
        currMainTask.name = null;
        currMainTask.id = null;
    }
    else{
        currMainTask.name = mainTask.value;
        currMainTask.id = mainTask.id;
    }

    // Update local storage
    stor.setItem("tasks", JSON.stringify(tasks));
};


export {storeTask, unstoreTask, updateTask, editTask, updateMainTask};