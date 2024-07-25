import { Label } from './ui/label'
import { Input } from './ui/input'
import { FormElementProps } from '@/utils'

type FormInputProps = {
  type: string
} & FormElementProps

function FormInput({ name, type, label, defaultValue }: FormInputProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input id={name} name={name} type={type} defaultValue={defaultValue} />
    </div>
  )
}

export default FormInput
