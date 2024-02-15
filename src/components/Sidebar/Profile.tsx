const Profile: React.FC = () => {
  return (
    <div className='flex justify-between p-2 mt-auto border border-t-zinc-400'>
      <div className='flex gap-2'>
        <img className='w-6 h-6 rounded-full object-cover' src='' alt='user image' />
        <h1>Lorem da Silva</h1>
      </div>
      <button>Logout</button>
    </div>
  )
}

export default Profile
