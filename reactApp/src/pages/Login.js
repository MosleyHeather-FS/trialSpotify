import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const clientId = '56d533ea88f14cd294c7a212424cb16f'
  const redirectUri = 'http://localhost:3000/callback'
  const apiUrl = 'https://accounts.spotify.com/authorize'
  const responseType = 'token'

  const navigate = useNavigate();
  const spotifyPath = "/spotify/v1"
  const valid = "/valid"

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

//   useEffect(() => {
//     fetch(`http://localhost:3000${spotifyPath}${valid}`)
//     .then(data=>data.url==="http://localhost:3000/" ? navigate("/profile") : navigate("/"))
//     .catch(error => console.log(error))
//   })

  const login = () => {
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`
  }

  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
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
      <button style={styles.logout} onClick={logout}>
        Logout
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
  logout: {
    leftMargin: '200px',
  },
  login: {},
  img: {
    width: '5%',
    marginRight: '10px',
  },
}
