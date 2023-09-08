// Get references to HTML elements
const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
window.addEventListener("load", () => {
    loadTasks();
});

// Add a new task
addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = "";
    }
});

// Function to add a task to the list
function addTask(taskText) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    `;

    // Add task to the list
    taskList.appendChild(taskItem);

    // Save tasks to local storage
    saveTasks();

    // Attach event listeners for edit and delete buttons
    const editButton = taskItem.querySelector(".edit");
    const deleteButton = taskItem.querySelector(".delete");

    editButton.addEventListener("click", () => {
        editTask(taskItem);
    });

    deleteButton.addEventListener("click", () => {
        deleteTask(taskItem);
    });
}

// Edit a task
function editTask(taskItem) {
    const span = taskItem.querySelector("span");
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null) {
        span.textContent = newText;
        saveTasks();
    }
}

// Delete a task
function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
    saveTasks();
}

// Save tasks to local storage
function saveTasks() {
    const tasks = Array.from(taskList.querySelectorAll("li span")).map(span => span.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task));
}
