import { useChat } from '../../context/ChatContext'
import Input from './Input'
import Messages from './Messages'
import Person from './Person'

const Chat: React.FC = () => {
  const { data } = useChat()

  return (
    <div className='flex flex-col gap-1 w-full rounded-r-lg bg-[#efefef]'>
      {data.chatId != 'null' && (
        <>
          <Person avatar={data.user.photoURL} name={data.user.displayName} />
          <Messages />
          <Input />
        </>
      )}
    </div>
  )
}

export default Chat
