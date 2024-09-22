import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/authContext'

function App() {
  const { authUser } = useAuthContext();
  return <div className='h-screen flex items-center justify-center bg-gray-100 w-full'>
    <Routes>
      <Route path='/' element={authUser ? <Home /> : <Navigate to='/login' />} />
      <Route path='/login' element={authUser ? <Navigate to="/" /> : <Login />} />
      <Route path='/signup' element={authUser ? <Navigate to="/" /> : <Signup />} />
    </Routes>
    <Toaster />
  </div>
}

export default App
