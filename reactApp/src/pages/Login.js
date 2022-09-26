import React from 'react';

export default function Login() {
    const click = () => {
        const clientId = process.env.CLIENT_ID;
        const redirectUri = "http://localhost:6000";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-email', 
            'user-read-private', 
            'user-modify-playback-state', 
            'user-read-playback-state', 
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read',
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join("")}&response_type=token$show_dialog=true`
    }
    return (
        <section>
            <button onClick={click}>Connect to Spotify</button>
        </section>
    )
}