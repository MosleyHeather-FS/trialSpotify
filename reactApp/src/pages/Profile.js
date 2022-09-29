import React, { useEffect, useState } from "react";
import axios from "axios";


export default function Profile() {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
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

  const searchArtists = async (e) => {
    e.preventDefault();

    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        query: search,
        type: "artist"
      }
    })
    setArtists(data.artists.items)
  }
  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
        {artist.name}
        {artist.images.length ? <img width={"50%"} src={artist.images[0].url}/> : <div>No Image</div>}
      </div>
    ))
  }
  
  
  return (
    <section style={styles.body}> 

    {token ?
     <form onSubmit={searchArtists}>
      <input type="text" onChange={e => setSearch(e.target.value)} />
      <button type={"submit"}>Search</button>
      </form>

      : <h2>You are not logged in. To view this page please login.</h2>
     }
     {renderArtists()}
      <h1>Homepage</h1>
    </section>
  );
}

const styles = {
    body: {
        width: "100vw",
        height: '100vh',
        display: 'grid',
        overflow: 'scroll',
        gridTemplateAreas: "'sidebar' 'nav' 'footer'",
        gridTemplateRows: "85vh 15vh"
    },
    sidebar: {
        display: "grid",
        gridTemplateColumns: '15vw 85vw',
        height: "100%",
        width: "100%"
    },
    nav: {

    },
    footer: {

    }
}
