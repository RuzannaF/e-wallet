import { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { checkAuth } from './redux/slices/authSlice'
import { Main } from './pages/main';
import { LoginPage } from './pages/login';
import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('token')) {
        dispatch(checkAuth())
    }
}, [])

  return (
    <div className="App">
      <LoginPage />
    </div>
  )
}

export default App;
