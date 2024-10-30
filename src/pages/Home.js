// src/components/Home.js
import React from 'react';
import Dropdown from '../componets/Dropdown';
import "../style/Home.css"

export default function Home() {
    return (
        <>
            <div className="main">
                <div className="section-1">
                    <div className="">


                        <h1 className="">F1</h1>
                        <p className="">
                            Formula 1 is a premier international single-seater auto racing championship that features the world's fastest cars and top drivers competing on various circuits around the globe.

                        </p>
                    </div>
                    <div className="section-2">
                        <Dropdown title="Races" content="Information about upcoming and past races." />
                        <Dropdown title="Drivers" content="Profiles and stats of all current drivers on the grid." />
                        <Dropdown title="Teams" content="Details about all F1 teams, their history, and performance." />
                        <Dropdown title="Standings" content="Current standings of drivers and teams in the F1 championship." />
                    </div>
                </div>
            </div>
        </>
    );
}
