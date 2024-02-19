import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FormEvent, useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { database } from '../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import logo from '../assets/logo.svg'

type AuthError = {
  code: string
}

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState({ name: '', email: '', passA: '', passB: '' })
  const [err, setErr] = useState<string>('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setLoading(true)

      if (!data.name || data.name.length <= 2) {
        setErr('Please enter a valid name.')
      }

      if (!data.email) {
        setErr('Please enter a valid email address.')
      }

      if (data.passA.length <= 5) {
        setErr('Password should be at least 6 characters.')
      }

      if (data.passA != data.passB) {
        setErr('Password do not match.')
      }

      const res = await signUp(data.email, data.passA)
      await updateProfile(res.user, { displayName: data.name })
      await setDoc(doc(database, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName: data.name,
        email: data.email,
      })
      await setDoc(doc(database, 'userChats', res.user.uid), {})
      navigate('/')
    } catch (error) {
      if ((error as AuthError).code == 'auth/email-already-in-use') {
        setErr('Email already taken.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='flex flex-col p-8 gap-4 items-center max-w-96 w-full rounded-md shadow shadow-black/30'>
        <img className='w-12' src={logo} alt='app logo' />
        <span>Register</span>
        {err && <p className='text-red-500'>{err}</p>}
        <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit}>
          <input
            className='px-2 py-1 w-full border border-slate-400 rounded-lg'
            type='text'
            name='name'
            placeholder='Name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <input
            className='px-2 py-1 w-full border border-slate-400 rounded-lg'
            type='email'
            name='email'
            placeholder='E-mail'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <input
            className='px-2 py-1 w-full border border-slate-400 rounded-lg'
            type='password'
            name='password'
            placeholder='Password'
            value={data.passA}
            onChange={(e) => setData({ ...data, passA: e.target.value })}
          />
          <input
            className='px-2 py-1 w-full border border-slate-400 rounded-lg'
            type='password'
            name='confirm-password'
            placeholder='Password'
            value={data.passB}
            onChange={(e) => setData({ ...data, passB: e.target.value })}
          />
          <button
            className='p-1 rounded border shadow shadow-[#49A348] bg-[#D9FDD3] hover:bg-[#D9FDD3] text-[#49A348] transition-all'
            disabled={loading}
          >
            Sign Up
          </button>
        </form>
        <p className='text-sm'>
          Already have an account?{' '}
          <Link to='/sign-in' className='text-[#49A348] hover:underline'>
            Sign In
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
