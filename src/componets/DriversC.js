import React, { useEffect, useState } from "react";

const DriversC = () => {
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStandings = async () => {
            try {
                const response = await fetch("http://ergast.com/api/f1/current/driverStandings.json");
                const data = await response.json();

                const organizedStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => ({
                    rank: driver.position,
                    driver_name: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
                    number: driver.Driver.permanentNumber,
                    team_name: driver.Constructors[0].name,
                    points: driver.points
                }));

                setStandings(organizedStandings);
            } catch (error) {
                setError("Error fetching standings.");
                console.error("Error fetching standings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStandings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 style={{ fontWeight: "bold", color: "red", textAlign: "center", margin: "1rem" }}>F1 DRIVERS STANDINGS</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Driver Name</th>
                        <th>Number</th>
                        <th>Team Name</th>
                        <th>Points</th> {/* Add a column for points */}
                    </tr>
                </thead>
                <tbody>
                    {standings.map((driver) => (
                        <tr key={driver.number}>
                            <td>{driver.rank}</td>
                            <td>{driver.driver_name}</td>
                            <td>{driver.number}</td>
                            <td>{driver.team_name}</td>
                            <td>{driver.points}</td> {/* Display points */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriversC;
