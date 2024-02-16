import { ReactNode, createContext, useContext, useReducer } from 'react'
import { useAuth } from './AuthContext'

type User = {
  uid?: string
  // Defina outros campos do usuário, se necessário
}

type ChatData = {
  chatId: string
  user: User
}

type Action = {
  type: string
  payload?: any
}

type ChatContextProps = {
  data: ChatData
  dispatch: React.Dispatch<Action>
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

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { user } = useAuth()

  const INITIAL_STATE: ChatData = {
    chatId: 'null',
    user: {},
  }

  const chatReducer = (state: ChatData, action: Action): ChatData => {
    if (!user) throw new Error('User not authenticated')

    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId: user.uid > action.payload.uid ? user.uid + action.payload.uid : action.payload.uid + user.uid,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  const value: ChatContextProps = { data: state, dispatch }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export default ChatProvider
