import { SendHorizontal } from 'lucide-react'

const Input: React.FC = () => {
  return (
    <div className='flex gap-2 p-2 h-12'>
      <input className='w-full border rounded px-2 border-zinc-400' type='text' placeholder='text' />
      <button className='p-1'>
        <SendHorizontal />
      </button>
    </div>
  )
}
export default Input
