import { Form, useLoaderData, Link } from 'react-router-dom'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import FormRange from './FormRange'
import { Button } from './ui/button'
import { type ProductsResponseWithParams } from '../utils'
import FormCheckbox from './FormCheckbox'

const displayOrder: string[] = ['a-z', 'z-a', 'high', 'low']

function Filters() {
  const { meta, params } = useLoaderData() as ProductsResponseWithParams
  const { search, company, category, shipping, order, price } = params

  console.log(meta)

  return (
    <Form className="border rounded-md px-8 py-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {/* Search */}
      <FormInput
        name="search"
        type="search"
        label="search product"
        defaultValue={search}
      />
      {/* Categories */}
      <FormSelect
        label="select category"
        name="category"
        options={meta.categories}
        defaultValue={category}
      />
      {/* Companies */}
      <FormSelect
        label="select company"
        name="company"
        options={meta.companies}
        defaultValue={company}
      />
      {/* Order */}
      <FormSelect
        label="order by"
        name="order"
        options={displayOrder}
        defaultValue={order}
      />
      {/* Price */}
      <FormRange label="price" name="price" defaultValue={price} />
      {/* Shipping */}
      <FormCheckbox
        label="free shipping"
        name="shipping"
        defaultValue={shipping}
      />

      <Button type="submit" size="sm" className="self-end mb-2">
        Search
      </Button>
      <Button
        type="button"
        asChild
        size="sm"
        variant="outline"
        className="self-end mb-2"
      >
        <Link to="/products">Reset</Link>
      </Button>
    </Form>
  )
}
export default Filters
