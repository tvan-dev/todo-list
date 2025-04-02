//1. render tasks list

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tasks = []
const form = $(".todo-form")
const input = $("#todo-input")
const submitBtn = $(".submit-btn")
const taskList = $(".task-list")
const taskItem = $(".task-item")
;

// ngăn chặn mất focus khi click vào nút submit đã thay bằng input.focus()
// submitBtn.onmousedown = function (e) {
//     e.preventDefault()
// }
function renderTask() {
    const htmls = tasks.map(task => {
        return `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <span class="task-title">${task.title}</span>
            <div class="task-action">
                <button class="task-btn edit">Edit</button>
                <button class="task-btn done">${task.completed ? "Completed" : "Done"} </button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>`
    })
    
    taskList.innerHTML = htmls.join("")
}

form.onsubmit = function (e) {
    e.preventDefault();

    const taskName = input.value.trim()
    const trueName = tasks.find(task => task.title.toLowerCase() === taskName.toLowerCase())
    
    if (!taskName) {
        return alert("Please enter your task!")
        
    }
    
    if (trueName) {
        alert("Task already exists!")
        input.value = ""
        return
    }

    tasks.push({
        title: taskName,
        completed: false,
    })
    input.value = ""
    input.focus()
    renderTask()
}


