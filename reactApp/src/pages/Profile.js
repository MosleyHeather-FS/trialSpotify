import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&")[0].split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const searchArtists = async (e) => {
    e.preventDefault();

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      params: {
        query: search,
        type: "artist",
        limit: 20,
      },
    });
    
    setArtists(data.artists.items);
    
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.name}
        {artist.images.length ? (
          <img style={styles.artistImg} src={artist.images[0].url} />
        ) : (
          <div>No Image</div>
        )}
      </div>
    ));
  };

  const logout = () => {
    setToken('')
    window.localStorage.removeItem('token')
  }

  return (
    <section style={styles.page}>
      <nav style={styles.nav}>
      <img
          style={styles.img}
          src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-pink-logo-33.png"
        />
        {token ? (
          <form style={styles.search} onSubmit={searchArtists}>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            <button type={"submit"}>Search</button>
          </form>
        ) : (
          <div>
            <h2>You are not logged in. To view this page please login.</h2>
            <Link to="/login">Login</Link>
          </div>
        )}
        <button style={styles.logout} onClick={logout}>
        Logout
      </button>
      </nav>
      <div style={styles.body}>
        {renderArtists()}
        </div>
    </section>
  );
}

const styles = {
  page: {
    backgroundColor: "#13072a",
    height: "100vh",
    width: "100vw",
    overflow: 'scroll',
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    
    color: 'white'
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
  },
  img: {
    width: '2%',
    marginLeft: '10px',
    marginTop: '10px',
  },
  artistImg: {
    width: '15%',
    color: 'white'
  },
  search: {
    marginLeft: '30%',
    marginTop: '10px',
  },
  logout: {
    marginLeft: '20px',
  },
};
