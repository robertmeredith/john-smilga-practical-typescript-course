import { Task } from './types'

type ListProps = {
  tasks: Task[]
  toggleTask: (task: Task) => void
}

const List = ({ tasks, toggleTask }: ListProps) => {
  return (
    <ul className="list">
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <p className="task-text">{task.description}</p>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleTask(task)}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default List
