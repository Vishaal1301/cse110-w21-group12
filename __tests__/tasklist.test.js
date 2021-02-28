import {storeTask, unstoreTask, updateTask, editTask, getTask, getMainTask} from '../source/scripts/task-list-local-storage.js'
const stor = window.localStorage;

beforeEach(() => {
    localStorage.clear();
    const newTasks = {'mainTask': {'name': null, 
                                    'checked': false, 
                                    'id': null}, 
                    'list': []};
    stor.setItem('tasks', JSON.stringify(newTasks));
  });

test('adds 1 + 2 to equal 3', () => {
    storeTask("test1");
    let task = getTask(0)
    expect(task.name).toBe();
  });