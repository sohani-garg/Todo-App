
var taskForm = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var addButton = document.getElementById("addButton");

var tasks = [];

// Show Add Task button when user types
taskInput.addEventListener("input", function() {

    if (taskInput.value.trim() !== "") {
        addButton.style.display = "block";
    } else {
        addButton.style.display = "none";
    }

});

// Add task
taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    var taskValue = taskInput.value.trim();

    if (taskValue === "") {
        return;
    }

    var task = {
        title: taskValue,
        completed: false
    };

    tasks.push(task);

    displayTasks();

    taskForm.reset();

    addButton.style.display = "none";

});

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        var empty = document.createElement("p");

        empty.className = "empty-message";
        empty.textContent = "No tasks added yet!";

        taskList.appendChild(empty);

        return;
    }

    tasks.forEach(function(task, index) {

        var taskDiv = document.createElement("div");

        taskDiv.className = "task";

        if (task.completed) {
            taskDiv.classList.add("completed");
        }

        // Task title
        var title = document.createElement("span");

        title.className = "task-title";
        title.textContent = task.title;

        // Controls section
        var controls = document.createElement("div");

        controls.className = "task-controls";

        // Complete checkbox
        var checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", function() {

            completeTask(index);

        });

        // Delete button
        var deleteButton = document.createElement("button");

        deleteButton.className = "delete-btn";
        deleteButton.textContent = "×";
        deleteButton.type = "button";
        deleteButton.title = "Delete task";

        deleteButton.addEventListener("click", function() {

            deleteTask(index);

        });

        controls.appendChild(checkbox);
        controls.appendChild(deleteButton);

        taskDiv.appendChild(title);
        taskDiv.appendChild(controls);

        taskList.appendChild(taskDiv);

    });

}

// Mark task completed or pending
function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    displayTasks();

}

// Delete task
function deleteTask(index) {

    tasks.splice(index, 1);

    displayTasks();

}
