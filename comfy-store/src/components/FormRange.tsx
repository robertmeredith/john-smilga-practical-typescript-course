import { formatAsDollars } from '@/utils'
import { useState } from 'react'

import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { type FormElementProps } from '@/utils'


function FormRange({ name, label, defaultValue }: FormElementProps) {
  // step to move range in
  const step = 10000
  const maxPrice = 100000
  // if default price passed in from url then covert to number, otherwise use max price
  const defaultPrice = defaultValue ? Number(defaultValue) : maxPrice

  const [selectedPrice, setSelectedPrice] = useState(defaultPrice)

  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitlaize flex justify-between">
        {label || name}
        <span>{formatAsDollars(selectedPrice)}</span>
      </Label>
      <Slider
        id={name}
        name={name}
        step={step}
        max={maxPrice}
        value={[selectedPrice]}
        onValueChange={(value) => setSelectedPrice(value[0])}
        className='mt-4'
      />
    </div>
  )
}
export default FormRange
