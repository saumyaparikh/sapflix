import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

export default function LoginWithGoogle({ setIsLoggedIn }) {
  const handleLogin = async (response) => {
    console.log("Google credential:", response.credential)
    try {
      const res = await axios.post(
        'http://localhost:8000/api/auth/google/',
        { credential: response.credential },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('Login success:', res.data)

      // Store tokens
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)

      // Update login state
      setIsLoggedIn(true)
    } catch (err) {
      console.error('Google login error:', err.response?.data || err.message)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <GoogleLogin
        theme="filled_blue"
        size="large"
        text="signin_with"
        shape="pill"
        width="200"
        onSuccess={handleLogin}
        onError={() => console.log('Login Failed')}
      />
    </div>
  )
}
