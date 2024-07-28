import { ActionFunction, Form, redirect } from 'react-router-dom'
import FormInput from './FormInput'
import SubmitBtn from './SubmitBtn'
import { customFetch, formatAsDollars, type Checkout } from '@/utils'
import { toast } from '@/components/ui/use-toast'
import { clearCart } from '../features/cart/cartSlice'
import { ReduxStore } from '@/store'

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const address = formData.get('address') as string

    // form validation
    if (!name || !address) {
      toast({ description: 'Please fill out all fields' })
      return null
    }

    // check for user in case magically got passed route redirect in loader
    const user = store.getState().userState.user
    if (!user) {
      toast({ description: 'Please login to place an order' })
      return redirect('/login')
    }

    const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState

    const info: Checkout = {
      name,
      address,
      chargeTotal: orderTotal,
      orderTotal: formatAsDollars(orderTotal),
      cartItems,
      numItemsInCart,
    }

    try {
      await customFetch.post(
        '/orders',
        { data: info },
        { headers: { Authorization: `Bearer ${user.jwt}` } }
      )
      store.dispatch(clearCart())
      toast({ description: 'Order Success' })
      return redirect('/orders')
    } catch (error) {
      toast({ description: 'order failed' })
      return null
    }
  }

function CheckoutForm() {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl mb-4">Shipping Information</h4>
      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />
      <div>
        <SubmitBtn text="Place Your Order" className="mt-4" />
      </div>
    </Form>
  )
}
export default CheckoutForm
