import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Login() {
  const clientId = "56d533ea88f14cd294c7a212424cb16f";
  const redirectUri = "http://localhost:3000/";
  const apiUrl = "https://accounts.spotify.com/authorize";
  const responseType = "token";

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

  const login = () => {
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`;
  };

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        query: search,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
  };
  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.name}
        {artist.images.length ? (
          <img width={"50%"} src={artist.images[0].url} />
        ) : (
          <div>No Image</div>
        )}
      </div>
    ));
  };

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
      {token ? (
        <form onSubmit={searchArtists}>
          <input type="text" onChange={(e) => setSearch(e.target.value)} />
          <button type={"submit"}>Search</button>
        </form>
      ) : (
        <h2></h2>
      )}
      {renderArtists()}
    </section>
  );
}

const styles = {
  container: {
    backgroundColor: "#13072a",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: "50px",
    color: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logout: {
    leftMargin: "200px",
  },
  login: {},
  img: {
    width: "5%",
    marginRight: "10px",
  },
};
