import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'

function App() {
  return <div className='h-screen flex items-center justify-center bg-gray-100 w-full'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
    <Toaster />
  </div>
}

export default App
