import { useChat } from '../../context/ChatContext'
import Input from './Input'
import Messages from './Messages'
import Person from './Person'

const Chat: React.FC = () => {
  const { data } = useChat()

  return (
    <div className='w-full'>
      <Person avatar={data?.user.photoURL} name={data?.user.displayName} />
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
