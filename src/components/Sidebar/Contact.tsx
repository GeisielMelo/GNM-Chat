const Contact: React.FC = () => {
  return (
    <div className='flex items-center gap-2 p-2 rounded active:bg-zinc-400'>
      <img className='w-9 h-9 rounded-full object-cover' src='' alt='user image' />
      <div>
        <h1 className='text-sm'>Lorem de Souza</h1>
        <p className='text-xs'>Lorem ipsum dolor sit amet consectetur...</p>
      </div>
    </div>
  )
}

export default Contact
