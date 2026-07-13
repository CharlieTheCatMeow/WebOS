const todoTopBarAddName = document.querySelector("#todoTopBarAddName");
const todoTopBarAddButton = document.querySelector("#todoTopbarAddButton");
const todoContent = document.querySelector("#todoContent");

let todoListItems = JSON.parse(localStorage.getItem("todoListItems")) || []

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function renderTodoContent() {
    todoContent.innerHTML = "";

    const sortedList = [...todoListItems].sort((a, b) => a.completed - b.completed);

    sortedList.forEach(function (task) {
        let newContent = document.createElement("div");
        newContent.classList.add("todo_list_task");
        if (localStorage.getItem("Mode") === "dark") {
            newContent.classList.add("todo_list_task_dark_mode");
        }

        if (Date.now() - task.id < 300) {
            newContent.classList.add("task_animate_in");
        }

        newContent.innerHTML = `
            <div class="todo_list_complete_and_name">
                <div class="todo_list_item_complete" id="todoListItemComplete${task.id}"></div>
                <p class="todo_list_item_name ${task.completed ? 'task_completed' : ''}">${task.name}</p>
            </div>
            <div class="todo_list_item_delete" id="todoListItemDelete${task.id}"></div>
        `;
        todoContent.appendChild(newContent);

        const todoListCompleteButton = document.querySelector(`#todoListItemComplete${task.id}`);
        const todoListDeleteButton = document.querySelector(`#todoListItemDelete${task.id}`);
        todoListCompleteButton.addEventListener("click", function () {
            task.completed = !task.completed;
            renderTodoContent();
        });
        todoListDeleteButton.addEventListener("click", function () {
            todoListItems = todoListItems.filter(t => t.id !== task.id);
            renderTodoContent();
        });
        todoListCompleteButton.style.backgroundColor = task.completed ? "green" : "rgba(0, 0, 0, 0.2)";
    })

    localStorage.setItem("todoListItems", JSON.stringify(todoListItems));
}

todoTopBarAddButton.addEventListener("click", async function (){
    const taskText = todoTopBarAddName.value;

    if (taskText.trim() !== "") {
        todoListItems.push({
            id: Date.now(),
            name: taskText,
            completed: false
        });

        renderTodoContent();

        todoTopBarAddName.value = "";
    } else {
        todoTopBarAddName.placeholder = "Please enter a name.";
        await delay(800);
        todoTopBarAddName.placeholder = "Task name here...";
    }
});

renderTodoContent();

todoTopBarAddName.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        todoTopBarAddButton.click();
    }
});
