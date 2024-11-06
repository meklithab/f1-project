import axios from "axios";
import { useEffect, useState } from "react";
import DriveData from "../componets/DriverData"


import "../style/Drivers.css"
import NavBar from "../componets/NavBar";

import img from "../images/fp1/redblack.jpg"
const Drivers = () => {
    const [driversData, setDriversData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = "https://api.openf1.org/v1/drivers?session_key=latest";
        axios.get(apiUrl)
            .then((response) => {
                console.log(response);
                setDriversData(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Unable to fetch data");
                setLoading(true);
            });
    }, []);

    if (loading) {
        return <h1>Loading...</h1>;
    }


    return (
        <>
            <div className="drivers-container">
                <div className='top-image' style={{ backgroundImage: `url(${img})`, backgroundSize: 'contain' }} >
                    <NavBar />

                </div>
                                <div style={{margin:"4rem"}}>
              
                <div>            <DriveData data={driversData} />
                </div>
                </div>
            </div>

        </>
    );
}

export default Drivers;
