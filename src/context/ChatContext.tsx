import { ReactNode, createContext, useContext, useState } from 'react'
import { useAuth } from './AuthContext'

export type IUser = {
  displayName?: string
  photoURL?: string
  uid?: string
}

export type IChatData = {
  chatId: string
  user: IUser
}

type ChatContextProps = {
  data: IChatData
  setChatsData: (userInfo: IUser) => void
}

type ChatProviderProps = {
  children: ReactNode
}

export const ChatContext = createContext<ChatContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used inside a ChatProvider.')
  }
  return context
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { user } = useAuth()
  const [data, setData] = useState<IChatData>({
    chatId: 'null',
    user: {},
  })

  const setChatsData = (userInfo: IUser) => {
    if (!user) throw new Error('User not authenticated.')
    if (!userInfo.uid) throw new Error('User not found.')

    setData({
      user: userInfo,
      chatId: user.uid > userInfo.uid ? user.uid + userInfo.uid : userInfo.uid + user.uid,
    })
  }

  const value: ChatContextProps = { data, setChatsData }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}
