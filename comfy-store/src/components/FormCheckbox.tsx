import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { type FormElementProps } from '@/utils'

function FormCheckbox({ name, label, defaultValue }: FormElementProps) {
  return (
    <div className="mb-2 flex justify-between self-end">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Checkbox name={name} id={name} defaultChecked={defaultValue === 'on'} />
    </div>
  )
}
export default FormCheckbox
