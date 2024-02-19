import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/logo.svg'
import { Spinner } from '../components/Spinner'

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
      <div className='flex flex-col p-8 gap-4 items-center max-w-96 w-full rounded-md border shadow shadow-black/30'>
        <img className='w-12' src={logo} alt='app logo' />
        <span>Login</span>
        {err && <p className='text-red-500'>{err}</p>}
        <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit}>
          <input
            className='px-2 py-1 w-full border border-zinc-400 rounded-md disabled:cursor-not-allowed'
            type='email'
            name='email'
            autoComplete='on'
            placeholder='E-mail'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            disabled={loading}
          />
          <input
            className='px-2 py-1 w-full border border-zinc-400 rounded-md disabled:cursor-not-allowed'
            type='password'
            name='password'
            autoComplete='on'
            placeholder='Password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            disabled={loading}
          />
          <button
            className='flex justify-center p-1 rounded border shadow shadow-[#49A348] bg-[#D9FDD3] hover:bg-[#D9FDD3] text-[#49A348] transition-all disabled:cursor-progress'
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </form>
        <p className='text-sm'>
          Don't have an account?{' '}
          <Link to='/sign-up' className='text-[#49A348] hover:underline'>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
