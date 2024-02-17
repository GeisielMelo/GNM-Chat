import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { user, authenticated, logout } = useAuth()

  return (
    <div className='flex justify-between items-center p-2 h-[3.125rem]'>
      <div className='flex gap-2'>
        {user?.photoURL ? (
          <img className='w-6 h-6 rounded-full object-cover' src={user.photoURL} alt='user image' />
        ) : (
          <h1 className='capitalize text-center text-white bg-zinc-400 w-6 h-6 rounded-full'>
            {user && user.displayName ? user.displayName[0] : 'N/A'}
          </h1>
        )}
        <h2 className='capitalize'>{user ? user.displayName : 'offline'}</h2>
      </div>
      <button onClick={() => (authenticated ? logout() : navigate('/sign-in'))}>Logout</button>
    </div>
  )
}

export default Profile
