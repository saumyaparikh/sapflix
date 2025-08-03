import React from 'react'
import { useEffect, useState } from 'react'
import LoginWithGoogle from './components/LoginWithGoogle'
import WelcomePage from './components/WelcomePage'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const access = localStorage.getItem('access')
    if (access) {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <WelcomePage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginWithGoogle setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  )
}

export default App
