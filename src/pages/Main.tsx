import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Main = () => {
  const navigate = useNavigate()
  const { authenticated } = useAuth()
  const buttonStyle = 'p-1 rounded border border-zinc-400'

  return (
    <section className='flex flex-col items-center justify-center h-screen'>
      <h1>Hello World</h1>
      {authenticated ? (
        <button className={buttonStyle} onClick={() => navigate('/home')}>
          Home Page
        </button>
      ) : (
        <button className={buttonStyle} onClick={() => navigate('/sign-in')}>
          Sign In
        </button>
      )}
    </section>
  )
}

export default Main
