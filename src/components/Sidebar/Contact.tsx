type ContactProps = {
  avatar: string
  name: string
  message: string
  onClick: () => void
}

const Contact: React.FC<ContactProps> = ({ avatar, name, message, onClick }) => {
  return (
    <div
      className='flex justify-center md:justify-normal items-center gap-2 p-2 rounded shadow bg-[#ffffff] active:bg-[#D9FDD3] transition-all'
      onClick={onClick}
    >
      {avatar != 'N/A' ? (
        <img className='w-9 h-9 rounded-full object-cover' src={avatar} alt='user image' />
      ) : (
        <h1 className='flex items-center justify-center capitalize w-9 h-9 rounded-full text-white bg-zinc-400'>
          {name ? name[0] : 'N/A'}
        </h1>
      )}

      <div className='hidden md:block'>
        <h1 className='text-sm capitalize text-nowrap truncate'>{name}</h1>
        {message && <p className='text-xs'>{message}</p>}
      </div>
    </div>
  )
}

export default Contact
