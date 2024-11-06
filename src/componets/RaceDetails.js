import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../style/RaceDetails.css"
import background from "../images/fp1/redblack.jpg"
import NavBar from './NavBar';

const RaceDetails = () => {
    const location = useLocation();
    const { state } = location;
    const session = state?.session;

    const [finalPositions, setFinalPositions] = useState([]);
    const [sortedDriverData, setSortedDriverData] = useState([]);

    useEffect(() => {
        const getDriverData = async () => {

            try {

                let apiUrl = `https://api.openf1.org/v1/position?session_key=${session.session_key}`
                let response = await axios.get(apiUrl)
                const data = response.data

                const driverPositions = {};

                data.forEach(position => {
                    const { driver_number, position: pos, date } = position;
                    if (!driverPositions[driver_number] || new Date(date) > new Date(driverPositions[driver_number].date)) {
                        driverPositions[driver_number] = { position: pos, date };
                    }
                });

                console.log(data)

                const sortedFinalPositions = Object.entries(driverPositions)
                    .map(([driver_number, { position }]) => ({ driver_number, position }))
                    .sort((a, b) => a.position - b.position);

                setFinalPositions(sortedFinalPositions);

                let apiUrl2 = `https://api.openf1.org/v1/drivers?session_key=${session.session_key}`;
                const response2 = await axios.get(apiUrl2);
                let driverArray = response2.data;
                driverArray.forEach((driver) => {
                    const positionData = finalPositions.find(element => parseInt(element.driver_number) === driver.driver_number);
                    driver["position"] = positionData ? positionData.position : "-";
                });

                console.log(driverArray)

                setSortedDriverData(driverArray.sort((a, b) => a.position - b.position))

            } catch (error) {
                console.log("Error fetching data.")
            }



        }

        if (session) {
            getDriverData()

        }

    }, [session, finalPositions])





    return (
        <div className='details-main' >
            <div style={{ backgroundImage: `url(${background})`, backgroundSize: "contain", height:"10rem"}}><NavBar/></div>
            
            <h1 className="font-bold  text-center p-7 text-4xl text-red-600">
                {(session.session_name).toUpperCase()} RESULTS
            </h1>
            {session && sortedDriverData.length > 0 ? (
                <div>
                    {/*   <p>Session Key: {session.session_key}</p> */}

                  
                    <table className='race-detail-table'>
                        <tr>
                            <th className='race-detail-th'>Position</th>
                            <th className='race-detail-th'>Driver Number</th>
                            <th className='race-detail-th'>Name</th>
                            <th className='race-detail-th'>Team</th>
                        </tr>
                        {sortedDriverData.map((driver, index) => (
                            <tr key={index}>
                                <td className='race-detail-td'>{driver.position}</td>
                                <td className='race-detail-td'>{driver.driver_number}</td>
                                <td className='race-detail-td'>{driver.full_name}</td>
                                <td className='race-detail-td'>{driver.team_name}</td>
                            </tr>

                        ))}
                    </table>

                </div>
            ) : (
                <p style={{color:"white"}}>Loading...</p>
            )}
        </div>
    );
};

export default RaceDetails;
