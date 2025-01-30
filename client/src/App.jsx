import './App.css'
import Calendar from './components/Calendar'
import Home from './pages/home'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'

function App() {

  return (
    <div>
      <Home /> {/** change this to <LoginPage /> once server side code is working. leave as home for development purposes */}
      <LoginPage />
      <RegisterPage />

    </div>
  )
}

export default App
