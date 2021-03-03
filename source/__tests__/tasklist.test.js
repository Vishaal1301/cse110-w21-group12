import {storeTask, unstoreTask, updateTask, editTask, updateMainTask} from '../scripts/task-list-local-storage.js'
const stor = window.localStorage;

beforeEach(() => {
    localStorage.clear();
    const newTasks = {'mainTask': {'name': null, 
                                    'checked': false, 
                                    'id': null}, 
                    'list': []};
    stor.setItem('tasks', JSON.stringify(newTasks));
  });


test('Store tasks', () => {
  let taskName1 = "test1";
  let taskName2 = "test2";

  // Check the return
  let task1Object = storeTask(taskName1);
  let task2Object = storeTask(taskName2);

  expect(task1Object.name).toBe(taskName1);
  expect(task1Object.checked).toBe(false);
  expect(task1Object.id).toBe(0);


  expect(task2Object.name).toBe(taskName2);
  expect(task2Object.checked).toBe(false);
  expect(task2Object.id).toBe(1);

  // Check that the local storage is correct
  let task1 = getTask(task1Object.id);
  let task2 = getTask(task2Object.id);

  expect(task1.name).toBe(taskName1);
  expect(task1.checked).toBe(false);
  expect(task1.id).toBe(0);

  expect(task2.name).toBe(taskName2);
  expect(task2.checked).toBe(false);
  expect(task2.id).toBe(1);
});

test('Remove a task (when no main task exists)', () => {
  // Add three tasks to local storage
  let taskName1 = "test1";
  let taskName2 = "test2";
  let taskName3 = "test3";
  storeTask(taskName1);
  storeTask(taskName2);
  storeTask(taskName3);

  // Remove the second task
  unstoreTask(1);

  // The first task should be the first task
  let task1 = getTask(0);
  expect(task1.name).toBe(taskName1);
  expect(task1.checked).toBe(false);

  // The second task should be the third task
  let task2 = getTask(1);
  expect(task2.name).toBe(taskName3);
  expect(task2.checked).toBe(false);
});

test('Remove a non-existing task', () => {
  let removed =  unstoreTask(0);
  expect(removed).toBe(false);
});

test('Update the checkbox of a task', () => {
  // Add a task to local storage
  let taskName1 = "test1";
  storeTask(taskName1);

  // Updating the first task should suceed, but he second should fail
  let updatedTask1 = updateTask(0, true);
  let updatedNonExistingTask = updateTask(1, true);

  expect(updatedTask1).toBe(true);
  expect(updatedNonExistingTask).toBe(false);

  // The first task should now be the second task
  let task1 = getTask(0);
  expect(task1.checked).toBe(true);
});

test('Edit the name of a task', () => {
  // Add a task to local storage
  let taskName1 = "test1";
  let newName = "test2";

  storeTask(taskName1);

  let edited = editTask(newName, 0);

  let task1 = getTask(0);

  expect(edited).toBe(true);
  expect(task1.name).toBe(newName);
  expect(task1.checked).toBe(false);
  expect(task1.id).toBe(0);
});

test('Edit the name of non-existing task', () => {
  // Add a task to local storage
  let taskName1 = "test1";
  let newName = "test2"

  storeTask(taskName1);

  let edited = editTask(newName, 1);

  expect(edited).toBe(false);
});

test('Update the main task (when no main task exists)', () => {
  // Add a task to local storage
  let taskName1 = "test1";
  let task1 = storeTask(taskName1);

  updateMainTask(task1);

  let mainTask = getMainTask();

  expect(mainTask.checked).toBe(false);
  expect(mainTask.id).toBe(0);
});

test('Update the main task (When current task is already main task)', () => {
  // Add a task to local storage
  let taskName1 = "test1";
  let task1 = storeTask(taskName1);

  // Select the main task twice
  updateMainTask(task1);
  updateMainTask(task1);

  let mainTask = getMainTask();

  expect(mainTask.checked).toBe(false);
  expect(mainTask.id).toBe(null);
});

test('unstore the main task', () => {
  // Add a task to local storage
  let taskName1 = "test1";
  let task1 = storeTask(taskName1);

  updateMainTask(task1);

  // Unstore the main task
  unstoreTask(0);

  let mainTask = getMainTask();

  expect(mainTask.name).toBe(null);
  expect(mainTask.checked).toBe(false);
  expect(mainTask.id).toBe(null);
});

test('unstore a task (when the main task is another task)', () => {
  // Add two tasks to local storage
  let taskName1 = "test1";
  let taskName2 = "test2";
  let task1 = storeTask(taskName1);
  let task2 = storeTask(taskName2);

  // Set the second task as the main task
  updateMainTask(task2);

  // Unstore the first task
  unstoreTask(task1.id);

  let mainTask = getMainTask();

  expect(mainTask.checked).toBe(false);
  expect(mainTask.id).toBe(0);
});


let getMainTask = function() {
  const tasks = JSON.parse(stor.getItem('tasks'));
  return tasks.mainTask;
}

let getTask= function(id) {
  const tasks = JSON.parse(stor.getItem('tasks'));
for(let i=0; i < tasks.list.length; i++){
  let task = tasks.list[i]
  if(task.id == id){
    return task;
  }
}
  return null;
}
