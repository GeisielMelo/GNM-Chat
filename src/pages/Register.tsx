import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { updateProfile } from 'firebase/auth'
import { database } from '../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import logo from '../assets/logo.svg'
import { Spinner } from '../components/Spinner'
import { FirebaseError } from 'firebase/app'

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(10, { message: 'Password must be at least 10 characters long' }),
})

const Register: React.FC = () => {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const showError = (code: string) => {
    let message = ''
    const pattern = /\/([a-z-]+)/
    const match = pattern.exec(code)

    if (match) {
      message = match[1].replace(/-/g, ' ')
      message = message.replace(/^\w/, (c) => c.toUpperCase())
    }

    setErr(message)
    setTimeout(() => {
      setErr('')
    }, 5000)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      const res = await signUp(values.email, values.password)
      await updateProfile(res.user, { displayName: values.name })
      await setDoc(doc(database, 'users', res.user.uid), {
        uid: res.user.uid,
        displayName: values.name,
        email: values.email,
      })
      await setDoc(doc(database, 'userChats', res.user.uid), {})
      navigate('/')
    } catch (error) {
      if (error instanceof FirebaseError) showError(error.code)
      else showError('auth/something-went-wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='flex flex-col p-8 gap-4 items-center max-w-96 w-full rounded-md shadow shadow-black/30'>
        <img className='w-12' src={logo} alt='app logo' />
        <span>Register</span>

        <form className='flex flex-col w-full gap-2' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <input
              {...register('name')}
              className='px-2 py-1 w-full border border-slate-400 rounded-lg'
              type='text'
              placeholder='Name'
              disabled={loading}
              autoComplete='off'
            />
            {errors.name && (
              <span className='text-[0.8rem] font-medium text-red-500'>{errors.name.message}</span>
            )}
          </div>

          <div className='flex flex-col'>
            <input
              {...register('email')}
              className='px-2 py-1 w-full border border-slate-400 rounded-lg'
              type='email'
              placeholder='E-mail'
              disabled={loading}
              autoComplete='off'
            />
            {errors.email && (
              <span className='text-[0.8rem] font-medium text-red-500'>{errors.email.message}</span>
            )}
          </div>

          <div className='flex flex-col'>
            <input
              {...register('password')}
              className='px-2 py-1 w-full border border-slate-400 rounded-lg'
              type='password'
              placeholder='Password'
              disabled={loading}
              autoComplete='off'
            />
            {errors.password && (
              <span className='text-[0.8rem] font-medium text-red-500'>
                {errors.password.message}
              </span>
            )}
          </div>

          {err && (
            <p className='normal-case text-center text-[0.8rem] font-medium text-red-500'>{err}</p>
          )}

          <button
            type='submit'
            className='flex justify-center p-1 rounded border shadow shadow-[#49A348] bg-[#D9FDD3] hover:bg-[#D9FDD3] text-[#49A348] transition-all disabled:cursor-progress'
            disabled={loading}
          >
            {loading ? <Spinner /> : 'Register'}
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
