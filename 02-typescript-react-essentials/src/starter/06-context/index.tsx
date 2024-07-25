import { useTheme, ThemeProvider } from './context'

function ParentComponent() {
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  )
}

function Component() {
  const context = useTheme()
  console.log(context)

  return (
    <div>
      <h2>React & Typescript</h2>
      <button
      className='btn btn-center'
        onClick={() => {
          if (context.theme === 'dark') {
            context.setTheme('system')
          } else {
            context.setTheme('dark')
          }
        }}
      >
        toggle theme
      </button>
    </div>
  )
}
export default ParentComponent
