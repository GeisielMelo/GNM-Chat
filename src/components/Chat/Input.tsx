import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { SendHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useChat } from '../../context/ChatContext'
import { database } from '../../config/firebase'
import { v4 as uuid } from 'uuid'

const Input: React.FC = () => {
  const [text, setText] = useState('')
  const { user } = useAuth()
  const { data } = useChat()

  const handleSend = async () => {
    if (text && user && data.user.uid && data.chatId) {
      await updateDoc(doc(database, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: user.uid,
          data: Timestamp.now(),
        }),
      })

      await updateDoc(doc(database, 'userChats', user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: Timestamp.now(),
      })

      await updateDoc(doc(database, 'userChats', data.user.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: Timestamp.now(),
      })
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className='flex gap-2 p-2 h-[3.125rem]'>
      <input
        className='w-full rounded px-2 shadow outline-none shadow-black/30'
        type='text'
        placeholder='Type a message'
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
      <button className='p-1' onClick={handleSend}>
        <SendHorizontal />
      </button>
    </div>
  )
}
export default Input
