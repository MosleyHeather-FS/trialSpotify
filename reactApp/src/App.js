import React from 'react'
import { useEffect, useState } from 'react'
import logo from '../public/spotifyLogo.png'

function App() {
  const clientId = "56d533ea88f14cd294c7a212424cb16f"
  const redirectUri = 'http://localhost:3000'
  const apiUrl = 'https://accounts.spotify.com/authorize'
  const responseType = 'token'

  const [token, setToken] = useState()
  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    
    if(!token && hash) {
      token = hash.substring(1).split('&')[0].split('=')[1];
    }
      window.location.hash = ""
      window.localStorage.setItem("token", token)
      setToken(token)
  }, []);

  const login = () => {
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`
  }

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  return (
    <section style={styles.container}>
      <img src="{logo}"></img>
      <h1 style={styles.heading}>Spotify</h1>
     <button style={styles.login} onClick={login}>Connect to Spotify</button>
     <button style={styles.logout} onClick={logout}>Logout</button>
    </section>
  )
}

const styles = {
  container: {
    backgroundColor: '#13072a',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: '50px',
    color: 'white'
  },
  logout: {
    leftMargin: '200px',
  },
  login: {
    

  },
}

export default App
