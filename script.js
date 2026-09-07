let tasks = [];

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const dateInput = document.getElementById("dateInput");

    const taskName = taskInput.value.trim();
    const taskDate = dateInput.value;

    if (taskName === "") {
        alert("Please enter a study task!");
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        date: taskDate,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";
    dateInput.value = "";

    displayTasks();
    updateStats();
}


function displayTasks() {

    const taskList = document.getElementById("taskList");
    const emptyMessage = document.getElementById("emptyMessage");

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    tasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="task-info">

                <span class="task-name">
                    ${task.name}
                </span>

                <span class="task-date">
                    ${task.date ? "📅 " + task.date : "📅 No deadline"}
                </span>

            </div>

            <div class="task-buttons">

                <button
                    class="complete-btn"
                    onclick="completeTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}


function completeTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            task.completed = !task.completed;
        }

        return task;
    });

    displayTasks();
    updateStats();
}


function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    displayTasks();
    updateStats();
}


function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}