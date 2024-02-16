import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { database } from '../../config/firebase'
import Contact from './Contact'
import { IUser, useChat } from '../../context/ChatContext'

type ChatsProps = {
  photoURL: string
  displayName: string
  text?: string
}

const Chats: React.FC = () => {
  const { user } = useAuth()
  const { setChatsData } = useChat()

  const [chats, setChats] = useState<ChatsProps>([])

  useEffect(() => {
    const getChats = () => {
      if (!user) return
      const unsub = onSnapshot(doc(database, 'userChats', user.uid), (doc) => {
        setChats(doc.data())
      })

      return () => {
        unsub()
      }
    }

    user && getChats()
  }, [user])

  const handleSelect = (u: IUser) => {
    setChatsData(u)
  }

  console.log(chats)

  return (
    <div className='p-2 h-[calc(100%-67px)] overflow-y-scroll'>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((_, key) => (
          <Contact
            key={key}
            avatar={_[1].userInfo.photoURL}
            name={_[1].userInfo.displayName}
            message={_[1].lastMessage?.text}
            onClick={() => handleSelect(_[1].userInfo)}
          />
        ))}
    </div>
  )
}

export default Chats
