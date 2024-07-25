type BasicProps = {
  type: 'basic'
  name: string
}
type AdvancedProps = {
  type: 'advanced'
  name: string
  email: string
}

// union type
type ProfileCardProps = BasicProps | AdvancedProps

function Component(props: ProfileCardProps) {
  const alertType = props.type === 'basic' ? 'success' : 'danger'

  return (
    <div className={`alert alert-${alertType}`}>
      <h2>{props.name}</h2>
      {props.type === 'advanced' && <h2>{props.email}</h2>}
    </div>
  )
}
export default Component
