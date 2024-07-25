const taskForm = document.querySelector<HTMLFormElement>('.form')
const formInput = document.querySelector<HTMLInputElement>('.form-input')

const taskListElement = document.querySelector<HTMLUListElement>('.list')

type Task = {
  description: string
  isCompleted: boolean
}

const tasks: Task[] = loadTasks()
tasks.forEach(renderTask)

taskForm?.addEventListener('submit', createTask)

// Create Task
function createTask(event: SubmitEvent) {
  event.preventDefault()
  const taskDescription = formInput?.value

  if (taskDescription) {
    // add task to list
    const task: Task = { description: taskDescription, isCompleted: false }
    addTask(task)

    // render task
    renderTask(task)

    // update local storage
    updateStorage()

    // reset form value
    formInput.value = ''

    return
  }
  alert('Please enter a task description')
}

// Add Task to List
function addTask(task: Task): void {
  tasks.push(task)
}

// Render Task to DOM List
function renderTask(task: Task): void {
  const taskElement = document.createElement('li')
  taskElement.textContent = task.description

  // checkbox
  const taskCheckbox = document.createElement('input')
  taskCheckbox.type = 'checkbox'
  taskCheckbox.checked = task.isCompleted

  // toggle checkbox ability
  taskCheckbox.addEventListener('change', () => {
    task.isCompleted = !task.isCompleted
    updateStorage()
  })
  
  taskElement.appendChild(taskCheckbox)
  taskListElement?.appendChild(taskElement)
}

// Update Local Storage
function updateStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Loads tasks from local storage
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks')
  console.log(storedTasks)

  return storedTasks ? JSON.parse(storedTasks) : []
}
