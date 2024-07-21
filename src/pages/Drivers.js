import axios from "axios";
import { useEffect, useState } from "react";
import DriveData from "../componets/DriverData"

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
            <h1>Drivers</h1>
            <DriveData data={driversData} />

        </>
    );
}

export default Drivers;
