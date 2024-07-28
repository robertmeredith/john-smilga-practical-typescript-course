import { Button } from '@/components/ui/button'
import { useAppSelector } from './hooks'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from './pages'

import { ErrorElement } from './components'
import { loader as landingLoader } from './pages/Landing'
import { loader as productsLoader } from './pages/Products'
import { loader as singleProductLoader } from './pages/SingleProduct'
import { loader as checkoutLoader } from './pages/Checkout'

// actions
import { action as registerUser } from './pages/Register'
import { action as loginUser } from './pages/Login'
import { action as checkoutAction } from './components/CheckoutForm'

import { store } from './store'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
        errorElement: <ErrorElement />,
      },
      {
        // url relative to above
        path: 'products',
        element: <Products />,
        loader: productsLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: 'products/:id',
        element: <SingleProduct />,
        loader: singleProductLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: 'cart/',
        element: <Cart />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'about',
        element: <About />,
        errorElement: <ErrorElement />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        loader: checkoutLoader(store),
        action: checkoutAction(store),
        errorElement: <ErrorElement />,
      },
      {
        path: 'orders',
        element: <Orders />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: '/login',
    // ACTION
    action: loginUser(store),
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/register',
    // ACTION
    action: registerUser,
    element: <Register />,
    errorElement: <Error />,
  },
])

function App() {
  return <RouterProvider router={router}></RouterProvider>
}
export default App
