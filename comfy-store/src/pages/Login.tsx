import {
  Form,
  Link,
  redirect,
  type ActionFunction,
  useNavigate,
} from 'react-router-dom'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SubmitBtn, FormInput } from '@/components'
import { customFetch } from '@/utils'
import { toast } from '@/components/ui/use-toast'
import { loginUser } from '@/features/user/userSlice'
import { useAppDispatch } from '@/hooks'
import { AxiosResponse } from 'axios'

// import special type from store
import { type ReduxStore } from '@/store'

// STANDARD USER LOGIN
export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
      const response: AxiosResponse = await customFetch.post(
        '/auth/local',
        data
      )
      const { username } = response.data.user
      const { jwt } = response.data

      store.dispatch(loginUser({ username, jwt }))

      return redirect('/')
    } catch (error) {
      console.log(error)
      toast({description: 'Login Failed'})
      return null
    }
  }

function Login() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // GUEST USER LOGIN
  async function loginAsGuestUser(): Promise<void> {
    try {
      // send hardcoded guest details to server
      const response: AxiosResponse = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      })

      // get username and jwt from response
      const { username } = response.data.user
      const { jwt } = response.data

      // add login details to state and local storage
      dispatch(loginUser({ username, jwt }))

      // navigate to homepage
      navigate('/')
    } catch (error) {
      console.log(error)
      toast({ description: 'Login failed' })
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Card className="w-96 bg-muted">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="post">
            <FormInput type="email" label="email" name="identifier" />
            <FormInput type="password" name="password" />
            <SubmitBtn text="Login" className="w-full mt-4" />
            <Button
              className="w-full mt-4"
              type="button"
              variant="outline"
              onClick={loginAsGuestUser}
            >
              Guest User
            </Button>
            <p className="text-center mt-4">
              Not a member yet?
              <Button type="button" asChild variant="link">
                <Link to="/register">Register</Link>
              </Button>
            </p>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
export default Login
