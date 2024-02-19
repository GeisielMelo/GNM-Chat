import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { LogOut } from 'lucide-react'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { user, authenticated, logout } = useAuth()

  return (
    <div className='flex justify-center md:justify-between items-center p-2 h-[3.125rem]'>
      <div className='hidden md:flex gap-2 '>
        {user?.photoURL ? (
          <img className='w-9 h-9 rounded-full object-cover' src={user.photoURL} alt='user image' />
        ) : (
          <h1 className='flex items-center justify-center capitalize text-white bg-zinc-400 w-9 h-9 rounded-full'>
            {user && user.displayName ? user.displayName[0] : 'N/A'}
          </h1>
        )}
        {/* <h2 className='capitalize'>{user ? user.displayName : 'offline'}</h2> */}
      </div>
      <button onClick={() => (authenticated ? logout() : navigate('/sign-in'))}>
        <LogOut size={22} />
      </button>
    </div>
  )
}

export default Profile
