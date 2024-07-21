import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RaceDetails = () => {
    const location = useLocation();
    const { state } = location;
    const session = state?.session;

    const [finalPositions, setFinalPositions] = useState([]);
    const [sortedDriverData, setSortedDriverData] = useState([]);

    useEffect(() => {
        const getDriverData = async () => {

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

            setSortedDriverData(driverArray.sort((a, b) => a.position - b.position))





        }

        if (session) {
            getDriverData()


        }


    }, [session.session_key])





    return (
        <div>
            <h1>{session.session_name}</h1>
            {session ? (
                <div>
                    <p>Session Key: {session.session_key}</p>
                    {sortedDriverData.map((driver, index) => (
                        <div key={index}>
                            <p>{driver.position}</p>
                            <p >{driver.driver_number}</p>
                            <p>{ driver.full_name}</p>
                            <p>{driver.team_name}</p>
                        </div>

                    ))}

                </div>
            ) : (
                <p>No session data found</p>
            )}
        </div>
    );
};

export default RaceDetails;
