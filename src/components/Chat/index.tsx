import { useChat } from '../../context/ChatContext'
import Input from './Input'
import Messages from './Messages'
import Person from './Person'
import Welcoming from './Welcoming'

const Index: React.FC = () => {
  const { data } = useChat()

  return data.chatId == 'null' ? (
    <div className='flex flex-col items-center justify-center w-full rounded-r-lg bg-[#efefef]'>
      <Welcoming />
    </div>
  ) : (
    <div className='flex flex-col gap-1 w-full rounded-r-lg bg-[#efefef]'>
      <Person avatar={data.user.photoURL} name={data.user.displayName} />
      <Messages />
      <Input />
    </div>
  )
}

export default Index
