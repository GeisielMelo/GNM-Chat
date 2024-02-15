import Input from './Input'
import Messages from './Messages'
import Person from './Person'

const Chat: React.FC = () => {
  return (
    <div className='w-full'>
      <Person />
      <Messages />
      <Input />
    </div>
  )
}
export default Chat
