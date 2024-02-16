import AppRoutes from './AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppRoutes />
      </ChatProvider>
    </AuthProvider>
  )
}

export default App
