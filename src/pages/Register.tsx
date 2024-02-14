const Register: React.FC = () => {
  return (
    <section className='flex justify-center items-center h-screen'>
      <div className='flex flex-col p-8 gap-4 items-center max-w-96 w-full rounded-md border border-zinc-400'>
        <span>Real Time Chat</span>
        <span>Register</span>
        <form className='flex flex-col w-full gap-2'>
          <input className='pl-2 rounded border border-zinc-400' type='email' placeholder='Name' />
          <input className='pl-2 rounded border border-zinc-400' type='email' placeholder='Email' />
          <input className='pl-2 rounded border border-zinc-400' type='password' placeholder='Password' />
          <button className='rounded border border-zinc-400'>Sign Up</button>
        </form>
        <p className='text-sm'>Already have an account?</p>
      </div>
    </section>
  )
}

export default Register
