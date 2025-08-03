
import React from 'react'

export default function WelcomePage({ setIsLoggedIn }) {
  const handleLogout = async () => {
  const refresh = localStorage.getItem('refresh');

  if (refresh) {
    await fetch('http://localhost:8000/api/auth/logout/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
  }

  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  setIsLoggedIn(false);
};

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Sapflix 🎉</h1>
      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Log out
      </button>
    </div>
  )
}
