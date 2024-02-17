import { Lock } from 'lucide-react'
import logo from '../../assets/logo.svg'

const Welcoming = () => {
  return (
    <div className='flex flex-col p-4 gap-2 items-center text-center'>
      <img className='max-w-20' src={logo} alt='image referring to the application logo' />
      <h1>GNM - Chat</h1>
      <p>Send and receive messages anytime, anywhere.</p>
      <div className='flex items-center fixed bottom-8 gap-1 text-[12px] text-black/50'>
        <Lock size={10} />
        <p> End-to-end encryption.</p>
      </div>
    </div>
  )
}
export default Welcoming
