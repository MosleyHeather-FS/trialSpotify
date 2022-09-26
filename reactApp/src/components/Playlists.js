import React, { useEffect } from 'react';
import axios from 'axios';
import { useStateProvider } from '../utils/stateProvider';
import { reducerCases } from '../utils/constants';

export default function Playlists() {
    const [{ token, playlists }, dispatch] = useStateProvider();
    useEffect(() => {
        const playlist = async () => {
            const res = await axios.get("https://api.spotify.com/v1/me/playlists",
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                },
            })
            const { items } = res.data;
            const playlists = items.map(({name, id}) => {
                return {name, id}
            });
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists })
        }
    })
}