// src/components/Home.js
import React from 'react';
import Dropdown from '../componets/Dropdown';
import "../style/Home.css"
import logo from "../images/fp1/logo.png"
import background from "../images/fp1/races.jpg"

import { useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate()
    return (

        <div className="main"
            style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
        >
            <div className='section-1'>
                <img className='logo' src={logo} alt='logo' />
                <ul className='menu'>
                    <li className='options' onClick={()=>navigate("/")}>Home</li>
                    <li className='options'>Blog</li>
                    <li className='options' onClick={()=>navigate("/info")}>Info</li>
                </ul>

            </div>

            <div className="section-2">
                <div className="section-2-1">

                    <p className="description">
                        <span className="title">
                            Formula 1 </span>   is an international auto racing championship that features the world's fastest cars and top drivers competing on various circuits around the globe. The sport showcases cutting-edge technology, with cars designed to achieve incredible speeds and handling precision. Each race, known as a Grand Prix, is a high-stakes challenge where drivers, teams, and engineers push the limits of skill, strategy, and innovation.
                    </p>

                </div>
                <div className="section-2-2">
                    <div><Dropdown title="Races" content="Information about upcoming and past races." /></div>
                    <div><Dropdown title="Drivers" content="Profiles and stats of all current drivers on the grid." /></div>
                    <div><Dropdown title="Teams" content="Details about all F1 teams, their history, and performance." /></div>
                    <div><Dropdown title="Standings" content="Current standings of drivers and teams in the F1 championship." /></div>

                </div>
            </div>
        </div>

    );
}
