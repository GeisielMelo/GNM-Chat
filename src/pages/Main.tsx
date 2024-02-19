import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'

const Main = () => {
  const navigate = useNavigate()

  return (
    <section className='relative w-full flex flex-col items-center justify-center px-2 md:px-8 py-4 bg-[#efefef]'>
      <div className='absolute inset-x-0 top-0 h-52 z-0 bg-[#49A348]' />

      <div className='flex items-center max-w-4xl w-full mb-8 z-10'>
        <img className='w-9' src={logo} alt='application logo.' />
        <h1 className='ml-4 text-white'>GNM - Chat</h1>
      </div>

      <main className='flex flex-col max-w-4xl w-full shadow shadow-black/30 rounded p-10 gap-10 z-10 bg-[#FFFFFF]'>
        <div className='flex flex-wrap justify-between w-full p-4 gap-4 rounded border border-zinc-300'>
          <div>
            <h1>You can learn more about this application on GitHub.</h1>
            <p className='text-xs'>
              This application is one of my personal projects and should be used for learning purposes only.
            </p>
          </div>
          <button
            className='px-4 py-2 text-white rounded-full text-sm bg-[#49A348] hover:bg-[#D9FDD3] hover:text-[#49A348] transition-all'
            onClick={() => window.open('https://github.com/GeisielMelo/GNM-Chat', '_blank')}
          >
            Go to Github
          </button>
        </div>

        <div>
          <h1 className='text-xl mb-4'>Available on desktop and mobile.</h1>
          <ul className='list-decimal ml-4'>
            <li>Use anytime, anywhere.</li>
            <li>Talk to your friends.</li>
            <li>Secure service.</li>
            <li>Easy to use.</li>
            <li>100% Free</li>
          </ul>
        </div>

        <div className='flex flex-wrap-reverse justify-between gap-8'>
          <div className='flex flex-col justify-center mb-12'>
            <h1 className='text-xl mb-4'>How to use?</h1>
            <ul className='list-decimal ml-4'>
              <li>Sign up with an email.</li>
              <li>Search for a contact by email.</li>
              <li>Start your conversation.</li>
            </ul>
          </div>

          <div className='flex md:block items-center justify-center 0 md:max-w-64 w-full'>
            <div className='w-full p-4 rounded shadow border border-[#49A348]'>
              <h1 className='mb-4 text-center'>Try out now</h1>
              <div className='flex flex-col gap-4 text-white'>
                <button
                  className='p-2 rounded shadow shadow-black/30 text-sm bg-[#49A348] hover:bg-[#D9FDD3] hover:text-[#49A348] transition-all'
                  onClick={() => navigate('/sign-in')}
                >
                  Sign In
                </button>
                <button
                  className='p-2 rounded shadow shadow-black/30 text-sm bg-[#49A348] hover:bg-[#D9FDD3] hover:text-[#49A348] transition-all'
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  )
}

export default Main
