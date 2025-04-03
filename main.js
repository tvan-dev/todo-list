//1. render tasks list

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tasks = []
const form = $(".todo-form")
const input = $("#todo-input")
const submitBtn = $(".submit-btn")
const taskList = $(".task-list")
const taskItem = $(".task-item")

// ngăn chặn mất focus khi click vào nút submit or thay bằng input.focus()
// submitBtn.onmousedown = function (e) {
//     e.preventDefault()
// }

//1. render tasks list
function renderTask() {
    const htmls = tasks.map(task => {
        return `
        <li class="task-item ${task.completed ? 'completed' : ''}">
            <span class="task-title">${task.title}</span>
            <div class="task-action">
                <button class="task-btn edit" onclick="edit(${task.id})">Edit</button>
                <button class="task-btn done">${task.completed ? "Completed" : "Done"} </button>
                <button class="task-btn delete">Delete</button>
            </div>
        </li>`
    })
    
    taskList.innerHTML = htmls.join("")
}
renderTask()

//2. kiểm tra task đầu vào hợp lệ 
function isValidTask(taskName) {
    const trueName = tasks.find(task => task.title.toLowerCase() === taskName.toLowerCase())
    
    if (!taskName) {
        alert("Please enter your task!")
        return false
        
    }
    
    if (trueName) {
        alert("Task already exists!")
        input.value = ""
        return false
    }
    return true
}

// 3. thêm task
form.onsubmit =  function (e) {
    e.preventDefault();

    const taskName = input.value.trim()

    if(isValidTask(taskName)) {
        console.log("hello");
        tasks.push({
            id: tasks.length + 1,
            title: taskName,
            completed: false,
        })
        input.value = ""
        renderTask()
    }
    
}

//4. chỉnh sửa task
function edit(id) {
    tasks.forEach(task => {
        if(task.id === id) {
            const taskEdited = prompt("Edit your task", task.title)
            isValidTask(taskEdited)
            task.title = taskEdit
        }

    })
    renderTask()
}
