import { useState } from 'react'

type Person = {
  name: string
}

function Component() {
  const [text, setText] = useState('')
  const [email, setEmail] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    // const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    console.log(data)
    const text = formData.get('text') as string
    const person: Person = { name: text }
    // const person: Person = { name: data.text as string}
  }

  return (
    <section>
      <h2>Events example</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input mb-1"
          value={text}
          // Inline - here typescript can infer the type
          onChange={(e) => setText(e.target.value)}
          name="text"
        />
        <input
          type="email"
          className="form-input mb-1"
          value={email}
          // Function reference - here we need to set the type in the function parameter
          onChange={handleChange}
          name="email"
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </section>
  )
}
export default Component
