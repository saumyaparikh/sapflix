import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

export default function LoginWithGoogle() {
  const handleLogin = async (response) => {
    console.log("Google credential:", response.credential)
    try {
      const res = await axios.post(
        'http://localhost:8000/api/auth/google/',
        { credential: response.credential },
        { headers: { 'Content-Type': 'application/json' } }
      )
      console.log('Login success:', res.data)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
    } catch (err) {
      console.error('Google login error:', err.response?.data || err.message)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <GoogleLogin
        theme="filled_blue"        // or "filled_blue", "filled_black"
  size="large"           // or "medium", "small"
  text="signin_with"     // or "signup_with", "continue_with", "signin"
  shape="pill"           // or "rectangular"
  width="200"         // or any specific width like "300px"
       onSuccess={handleLogin} onError={() => console.log('Login Failed')} />
    </div>
  )
}