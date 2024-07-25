import { useState } from 'react'

type Link = {
  id: number
  url: string
  text: string
}

const navLinks: Link[] = [
  {
    id: 1,
    url: 'some url',
    text: 'some text',
  },
  {
    id: 2,
    url: 'some url',
    text: 'some text',
  },
  {
    id: 3,
    url: 'some url',
    text: 'some text',
  },
]

function Component() {
  const [text, setText] = useState('shakeAndBake')
  console.log(text)

  // if using an empty array as initial value then need to state the type
  const [list, setList] = useState<string[]>([])
  console.log(list);
  

  const [links, setLinks] = useState<Link[]>(navLinks)
  console.log(links)

  return (
    <div>
      <h2 className={'mb-1'}>React & Typescript</h2>
      <button
        className="btn btn-center"
        onClick={() => {
          setText('bakeAndShake')
          setList(['hello', 'goodbye'])
          setLinks([...links, { id: 4, url: 'hello new link', text: 'hello' }])
        }}
      >
        Click Me
      </button>
    </div>
  )
}
export default Component
