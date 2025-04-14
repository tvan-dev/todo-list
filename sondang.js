const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tasks = JSON.parse(localStorage.getItem("tasks")) ?? []
const form = $(".todo-form")
const input = $("#todo-input")
const submitBtn = $(".submit-btn")
const taskList = $(".task-list")
const taskItem = $(".task-item")

// ngăn chặn mất focus khi click vào nút submit or thay bằng input.focus()
// submitBtn.onmousedown = function (e) {
//     e.preventDefault()
// }


//1. lưu trữ task vào localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

//1.1 render tasks list
function renderTask() {
    if(!tasks.length) {
        taskList.innerHTML = `<li class="empty-message">No tasks available</li>` 
        return;
    }
    const htmls = tasks.map((task, index) => {
        return `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-index="${index}">
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
        tasks.push({
            id: tasks.length + 1,
            title: taskName,
            completed: false,
        })
        input.value = ""
        renderTask()
        saveTasks()
    }
    
}

//4. handle  task action: edit, done, delete
function handleTaskActions(e) {
    //thêm attribute task-index vào task-item để lấy index của task trong mảng tasks- xem ở renderTask()
    const taskitem = e.target.closest(".task-item")

    const index = +taskitem.dataset.index
    const task = tasks[index]

    if(e.target.closest(".edit")) {
        const titleEdit = prompt("Edit your task",task.title)
        if(isValidTask(titleEdit)) {
            task.title = titleEdit
            renderTask()
            saveTasks()
        }
        return
    } 

    if(e.target.closest(".done")) {
        task.completed = !task.completed
        renderTask()
        saveTasks()
        return
    } 

    if(e.target.closest(".delete")) {
        let confirmDelete = confirm(`Are you sure you want to delete "${task.title}"?`)
        if(confirmDelete) {
            tasks.splice(index,1)
            renderTask()
            saveTasks()
        }
    }
}


renderTask()
form.addEventListener("submit", addTask)
taskList.addEventListener("click", handleTaskActions)
