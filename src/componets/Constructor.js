import React, { useEffect, useState } from "react";



const ConstructorStandings = () => {
    const [teamStandings, setTeamStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamStandings = async () => {
            try {
                const response = await fetch("https://ergast.com/api/f1/current/constructorStandings.json");
                const data = await response.json();

                const organizedTeamStandings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(team => ({
                    rank: team.position,
                    team_name: team.Constructor.name,
                    points: team.points
                }));

                setTeamStandings(organizedTeamStandings);
            } catch (error) {
                setError("Error fetching team standings.");
                console.error("Error fetching team standings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeamStandings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 style={{fontWeight:"bold",color:"red",textAlign:"center",margin:"1rem"}}>F1 CONSTRUCTORS STANDINGS</h2>
            <table style={{borderColor:'red'}}>
                <thead>
                    <tr>
                        <th>Rank</th>
                       
                        <th>Team Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {teamStandings.map((team) => (
                        <tr key={team.team_name}>
                            <td>{team.rank}</td>
                            <td>{team.team_name}</td>
                            <td>{team.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ConstructorStandings;
