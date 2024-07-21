
import React from 'react';
import "../style/Home.css"
import Dropdown from '../componets/Dropdown';


export default function Home() {



    return (
        <>

            

            <div className="container">
                <Dropdown title="Races" content="Information about upcoming and past races." />
                <Dropdown title="Drivers" content="Profiles and stats of all current drivers on the grid." />
                <Dropdown title="Teams" content="Details about all F1 teams, their history, and performance." />
                <Dropdown title="Standings" content="Current standings of drivers and teams in the F1 championship." />
            </div>



        </>


    )
}