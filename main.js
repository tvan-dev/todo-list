
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
                <button class="task-btn done" onclick="done(${task.id})">${task.completed ? "Completed" : "Done"} </button>
                <button class="task-btn delete" onclick="deleted(${task.id})">Delete</button>
            </div>
        </li>`
    })
    
    taskList.innerHTML = htmls.join("")
}

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
function addTask(e) {
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

//5. đánh dấu task đã hoàn thành
function done(id) {
    tasks.forEach(task => {
        if(task.id === id) {
            task.completed = !task.completed
        }
    })
    renderTask()
}

//6. xóa task
function deleted(id) {
    const task = tasks.find(task => task.id === id)
    const confirmDelete = confirm(`Are you sure you want to delete ${task.title}?`)
    if(confirmDelete) {
        tasks.splice(tasks.indexOf(task), 1)
        renderTask()
    }
}


renderTask()
form.addEventListener("submit", addTask)