import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type AuthError = {
  code: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState({ email: '', password: '' })
  const [err, setErr] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setLoading(true)
      await signIn(data.email, data.password)
      navigate('/')
    } catch (error) {
      if ((error as AuthError).code === 'auth/invalid-credential') {
        setErr('Invalid E-mail or Password.')
      }

      if ((error as AuthError).code === 'auth/too-many-requests') {
        setErr('Too many login attempts.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='flex flex-col p-8 gap-4 items-center max-w-96 w-full rounded-md border border-zinc-400'>
        <span>Real Time Chat</span>
        <span>Login</span>
        {err && <p className='text-red-500'>{err}</p>}
        <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit}>
          <input
            className='px-2 py-1 w-full border border-zinc-400 rounded-md'
            type='email'
            name='email'
            autoComplete='on'
            placeholder='E-mail'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            className='px-2 py-1 w-full border border-zinc-400 rounded-md'
            type='password'
            name='password'
            autoComplete='on'
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button className='rounded border border-zinc-400' disabled={loading}>
            Sign In
          </button>
        </form>
        <p className='text-sm'>
          Don't have an account? <Link to='/sign-up'>Sign Up</Link>
        </p>
      </div>
    </section>
  )
}

export default Login
