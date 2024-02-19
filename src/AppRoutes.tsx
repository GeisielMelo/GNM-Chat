import { ReactNode } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'

type RoutesProps = {
  children: ReactNode
}

const AppRoutes: React.FC = () => {
  const { authenticated, loading } = useAuth()

  const Private: React.FC<RoutesProps> = ({ children }) => {
    return loading ? <span>Loading...</span> : authenticated ? children : <Navigate to='/sign-in' />
  }

  const Public: React.FC<RoutesProps> = ({ children }) => {
    return loading ? <span>Loading...</span> : authenticated ? <Navigate to='/home' /> : children
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'*'} element={<Public><Main /></Public>}/>
        <Route path={'sign-in'} element={<Public><Login /></Public>}/>
        <Route path={'sign-up'} element={<Public><Register /></Public>}/>
        <Route path={'home'} element={<Private><Home /></Private>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default AppRoutes