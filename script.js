function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.done) li.classList.add("done");

        li.onclick = () => toggleTask(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value) return;

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: input.value, done: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    loadTasks();
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[index].done = !tasks[index].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

loadTasks();
