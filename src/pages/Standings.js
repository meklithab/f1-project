import React, { useState } from "react";
import DriversC from "../componets/DriversC";
import ConstructorStandings from "../componets/Constructor";
import NavBar from "../componets/NavBar";
import "../style/Standings.css"
import img from "../images/fp1/redblack.jpg"

const Standings = () => {
    const [current, setCurrent] = useState("Drivers");

    const buttonStyle = (type) => ({
        color: current === type ? "white" : "red",
        backgroundColor: current === type ? "red" : "transparent",
    });

    return (
        <div style={{backgroundColor:"black"}}>
            <div className='top-image' style={{ backgroundImage: `url(${img})`, backgroundSize: 'contain' }} >
                <NavBar />

            </div>
          <div style={{
                display: 'flex',
                justifyContent: 'center',
              
            }}>           
            <button
                className="standings-button"
                style={buttonStyle("Drivers")}
                onClick={() => setCurrent("Drivers")}
            >
                Drivers
            </button>
            <button
                className="standings-button"
                style={buttonStyle("Constructors")}
                onClick={() => setCurrent("Constructors")}
            >
                Constructors
            </button>
            </div>

            {current === "Drivers" ? <DriversC /> : <ConstructorStandings />}
        </div>
    );
};

export default Standings;
