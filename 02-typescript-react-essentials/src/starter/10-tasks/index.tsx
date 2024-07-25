import List from './List'
import { Task } from './types'
import Form from './Form'
import { useEffect, useState } from 'react'

// Load tasks from localStorage
function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks')
  return storedTasks ? JSON.parse(storedTasks) : []
}

function updateStorage(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function Component() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks())

  useEffect(() => {
    updateStorage(tasks)
  }, [tasks])

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task])
  }

  const toggleTask = (task: Task) => {
    setTasks(
      tasks.map((t) =>
        task.id === t.id ? { ...task, isCompleted: !task.isCompleted } : t
      )
    )
  }

  return (
    <div>
      <Form addTask={addTask}></Form>
      <List tasks={tasks} toggleTask={toggleTask}></List>
    </div>
  )
}
export default Component
