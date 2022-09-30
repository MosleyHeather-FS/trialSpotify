import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const clientId = '56d533ea88f14cd294c7a212424cb16f'
  const redirectUri = 'http://localhost:3000/callback'
  const apiUrl = 'https://accounts.spotify.com/authorize'
  const responseType = 'token'

  const [token, setToken] = useState('')

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = hash.substring(1).split('&')[0].split('=')[1]

      window.location.hash = ''
      window.localStorage.setItem('token', token)
    }
    setToken(token)
  }, [])

  const login = () => {
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`
  }

  

  return (
    <section style={styles.container}>
      <div style={styles.heading}>
        <img
          style={styles.img}
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-pink-logo-33.png"
        />
        <h1>Spotify</h1>
      </div>
      <button style={styles.login} onClick={login}>
        Connect to Spotify
      </button>
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
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {},
  img: {
    width: '5%',
    marginRight: '10px',
  },
}
