// src/components/Home.js
import React from 'react';
import Dropdown from '../componets/Dropdown';

export default function Home() {
    return (
        <>
            <div className="w-full h-screen bg-f1-background bg-cover bg-center bg-fixed m-1.5 p-4">
                <div className="flex h-11/12 items-center m-5">
                    <div className="flex-1">

                        <h1 className="text-white text-7xl m-6">F1</h1>
                        <p className="text-white text-sm leading-5  m-6 items-center">
                            Formula 1 is a premier international single-seater auto racing championship that features the world's fastest cars and top drivers competing on various circuits around the globe.
                            
                        </p>
                    </div>
                    <div className="flex-1">
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
