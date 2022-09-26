import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useStateProvider } from '../utils/stateProvider';

export default function Navbar() {
    const [{ userInfo }] = useStateProvider();
    return(
        <section>
            <div>
                <FaSearch />
                <input type="text" placeholder="search box" />
                <a href="#">
                    <span>{userInfo?.name}</span>
                </a>
            </div>
        </section>
    )
}