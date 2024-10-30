import React, { useState } from "react";
import DriversC from "../componets/DriversC";
import ConstructorStandings from "../componets/Constructor";

const Standings = () => {
    const [current, setCurrent] = useState(false)
    return (<div>
        <button onClick={() => setCurrent(false)}>
            Constructors
        </button>
        <button onClick={() => setCurrent(true)}>
            Drivers
        </button>

        {current ? (<DriversC />) : (
            <ConstructorStandings />
        )}


    </div>);


};

export default Standings;
