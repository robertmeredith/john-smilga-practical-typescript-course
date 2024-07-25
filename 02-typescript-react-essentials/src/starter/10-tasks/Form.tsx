// - Create a form with a single input.
// - Set up a controlled input.
// - Set up a form submit handler and ensure it checks for empty values.
import { useState } from 'react'
import { Task } from './types'

type FormProps = {
  addTask: (task: Task) => void
}

const Form = ({ addTask }: FormProps) => {
  const [description, setDescription] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    // prevent form refresh
    event.preventDefault()
    // if no description alert user
    if (!description) {
      alert('Please provide a task name')
    } else {
      const id = Math.floor(Math.random() * 10001).toString()
      addTask({
        id,
        description,
        isCompleted: false,
      })
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form task-form">
      <input
        type="text"
        className="form-input"
        onChange={(e) => setDescription(e.target.value)}
        name="description"
        value={description}
      />
      <button type="submit" className="btn">
        Add task
      </button>
    </form>
  )
}

export default Form
