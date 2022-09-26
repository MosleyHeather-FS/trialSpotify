import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/stateProvider";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { reducerCases } from "../utils/constants";

export default function Homepage() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authoerization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      const userInfo = {
        userId: data.id,
        userName: data.display_name,
      };
      
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };
    getUserInfo();
  }, [dispatch, token]);
  return (
    <body style={styles.body}> 
    
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <h1>Spotify</h1>
      <div style={styles.nav}>
        <Navbar />
      </div>
     
      <div style={styles.footer}>
        <Footer />
      </div>
    </body>
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
