import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { database } from '../../config/firebase'
import Contact from './Contact'
import { IUser, useChat } from '../../context/ChatContext'

type ChatProps = {
  id: string
  lastMessage: { text: string }
  userInfo: { displayName: string; photoURL: string; uid: string }
  date: { seconds: number; nanoseconds: number }
}

const Chats: React.FC = () => {
  const { user } = useAuth()
  const { setChatsData } = useChat()
  const [chats, setChats] = useState<ChatProps[] | null>(null)

  useEffect(() => {
    const getChats = () => {
      if (!user) return
      const unsub = onSnapshot(doc(database, 'userChats', user.uid), (doc) => {
        const data = doc.data()
        if (!data) return setChats(null)

        const dataToArr = Object.keys(data).map((key) => ({
          id: key,
          lastMessage: data[key].lastMessage,
          userInfo: data[key].userInfo,
          date: data[key].date,
        }))

        setChats(dataToArr.sort((a, b) => b.date - a.date))
      })

      return () => {
        unsub()
      }
    }

    user && getChats()
  }, [user])

  const handleSelect = (userInfo: IUser) => {
    setChatsData(userInfo)
  }

  return (
    <div className='p-2 h-[calc(100%-110px)] overflow-y-scroll'>
      {chats &&
        chats.map((chat, key) => (
          <Contact
            key={key}
            avatar={chat.userInfo.photoURL}
            name={chat.userInfo.displayName}
            message={chat.lastMessage?.text}
            onClick={() => handleSelect(chat.userInfo)}
          />
        ))}
    </div>
  )
}

export default Chats
