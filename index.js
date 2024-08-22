const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Path to the tasks file
const tasksFilePath = path.join(__dirname, 'tasks.json');

// Initialize the tasks file if it doesn't exist
if (!fs.existsSync(tasksFilePath)) {
    fs.writeFileSync(tasksFilePath, JSON.stringify([]));
}

// Function to get the list of tasks
function getTasks() {
    const tasksData = fs.readFileSync(tasksFilePath);
    return JSON.parse(tasksData);
}

// Function to save tasks to the file
function saveTasks(tasks) {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Function to add a new task
function addTask(description) {
    const tasks = getTasks();
    tasks.push({ description, completed: false });
    saveTasks(tasks);
    console.log('Task added successfully!');
}

// Function to view the list of tasks
function viewTasks() {
    const tasks = getTasks();
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description} [${task.completed ? '✔' : ' '}]`);
        });
    }
}

// Function to mark a task as complete
function completeTask(index) {
    const tasks = getTasks();
    if (index > 0 && index <= tasks.length) {
        tasks[index - 1].completed = true;
        saveTasks(tasks);
        console.log('Task marked as complete!');
    } else {
        console.log('Invalid task number.');
    }
}

// Function to remove a task
function removeTask(index) {
    const tasks = getTasks();
    if (index > 0 && index <= tasks.length) {
        tasks.splice(index - 1, 1);
        saveTasks(tasks);
        console.log('Task removed successfully!');
    } else {
        console.log('Invalid task number.');
    }
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to display the menu
function showMenu() {
    console.log('\nTask Manager');
    console.log('1. Add a new task');
    console.log('2. View tasks');
    console.log('3. Mark a task as complete');
    console.log('4. Remove a task');
    console.log('5. Exit');

    rl.question('Choose an option: ', (option) => {
        switch (option) {
            case '1':
                rl.question('Enter task description: ', (description) => {
                    addTask(description);
                    showMenu();
                });
                break;
            case '2':
                viewTasks();
                showMenu();
                break;
            case '3':
                rl.question('Enter task number to mark as complete: ', (index) => {
                    completeTask(parseInt(index));
                    showMenu();
                });
                break;
            case '4':
                rl.question('Enter task number to remove: ', (index) => {
                    removeTask(parseInt(index));
                    showMenu();
                });
                break;
            case '5':
                rl.close();
                break;
            default:
                console.log('Invalid option, please try again.');
                showMenu();
                break;
        }
    });
}

// Start the task manager
showMenu();
