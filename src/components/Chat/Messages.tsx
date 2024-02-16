import { useEffect, useState } from 'react'
import Message from './Message'
import { useChat } from '../../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { database } from '../../config/firebase'

const Messages: React.FC = () => {
  const [messages, setMessages] = useState([])
  const { data } = useChat()

  useEffect(() => {
    const unSub = onSnapshot(doc(database, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => unSub()
  }, [data.chatId])

  return (
    <div className='flex flex-col p-2 gap-2 h-[calc(100%-6.875rem)] overflow-y-scroll'>
      {messages.map((message, key) => (
        <Message key={key} message={message} />
      ))}
    </div>
  )
}
export default Messages
