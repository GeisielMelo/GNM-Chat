type PersonProps = {
  avatar?: string
  name?: string
}

const Person: React.FC<PersonProps> = ({ avatar, name }) => {
  return (
    <div className='flex items-center p-2 gap-2 h-[3.75rem] capitalize border border-b-zinc-400'>
      {avatar != 'N/A' ? (
        <img className='w-9 h-9 rounded-full object-cover' src={avatar} alt='user image' />
      ) : (
        <h1 className='flex items-center justify-center w-9 h-9 rounded-full text-white bg-zinc-400'>
          {name ? name[0] : 'N/A'}
        </h1>
      )}
      <h1>{name}</h1>
    </div>
  )
}

export default Person
