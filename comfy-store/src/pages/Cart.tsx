import { useAppSelector } from '@/hooks'
import { CartItemsList, CartTotals, SectionTitle } from '@/components'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Cart() {
  // temp
  // const user = null
  const user = useAppSelector((state) => state.userState.user)

  const numItemsInCart = useAppSelector(
    (state) => state.cartState.numItemsInCart
  )

  if (numItemsInCart === 0) {
    return <SectionTitle text="Empty cart" />
  }

  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 ">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          <Button asChild className="mt-8 w-full">
            <Link to={user ? '/checkout' : '/login'}>
              {user ? 'Proceed to checkout' : 'Please Login'}
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
export default Cart
