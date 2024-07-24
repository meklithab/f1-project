import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Flag from 'react-world-flags';
import { useNavigate } from 'react-router-dom';


const F1EventSessions = () => {
    
    const f1RaceLocations = useMemo(() => ([
        { country: "Australia", description: "Australian Grand Prix", date: "2024-03-17" },
        { country: "Bahrain", description: "Bahrain Grand Prix", date: "2024-03-31" },
        { country: "China", description: "Chinese Grand Prix", date: "2024-04-14" },
        { country: "Azerbaijan", description: "Azerbaijan Grand Prix", date: "2024-04-28" },
        { country: "United States", description: "United States Grand Prix", date: "2024-05-12" },
        { country: "Spain", description: "Spanish Grand Prix", date: "2024-05-26" },
        { country: "Monaco", description: "Monaco Grand Prix", date: "2024-06-09" },
        { country: "Canada", description: "Canadian Grand Prix", date: "2024-06-23" },
        { country: "United Kingdom", description: "British Grand Prix", date: "2024-07-07" },
        { country: "Hungary", description: "Hungarian Grand Prix", date: "2024-07-21" },
        { country: "Belgium", description: "Belgian Grand Prix", date: "2024-08-04" },
        { country: "Netherlands", description: "Dutch Grand Prix", date: "2024-08-25" },
        { country: "Italy", description: "Italian Grand Prix", date: "2024-09-08" },
        { country: "Singapore", description: "Singapore Grand Prix", date: "2024-09-22" },
        { country: "Japan", description: "Japanese Grand Prix", date: "2024-10-13" },
        { country: "Mexico", description: "Mexican Grand Prix", date: "2024-10-27" },
        { country: "Brazil", description: "Brazilian Grand Prix", date: "2024-11-10" },
        { country: "United States", description: "Las Vegas Grand Prix", date: "2024-11-24" },
        { country: "United Arab Emirates", description: "Abu Dhabi Grand Prix", date: "2024-12-08" }
    ]), []);

    const [sessions, setSessions] = useState([]);
    const [names, setNames] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [upcomingRaces, setUpcomingRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const apiUrl = `https://api.openf1.org/v1/sessions?year=${new Date().getFullYear()}`;
                const response = await axios.get(apiUrl);

                if (response.data) {
                    const allSessions = response.data;
                    console.log(allSessions);

                    // Filter the sessions to get only Qualifying, Sprint, and Race
                    const filteredSessions = allSessions.filter(session =>
                        session.session_name === 'Qualifying' ||
                        session.session_name === 'Sprint' ||
                        session.session_name === 'Race'
                    );

                    setSessions(filteredSessions);

                    const locationNames = filteredSessions.map(element => element.country_name);
                    const uniqueLocationNames = [...new Set(locationNames)];
                    setNames(uniqueLocationNames);

                    const currentDate = new Date();
                    const temp = f1RaceLocations.filter(element => new Date(element.date) > currentDate);
                    setUpcomingRaces(temp);
                }
            } catch (e) {
                console.log('Error fetching sessions.');
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, [f1RaceLocations]);

    const handleClick = (session) => {
        navigate('/races/qualifying', { state: { session } });
    };

    return (
        <>
            <div className="c">
                <h1>F1 Event Sessions</h1>
                {loading ? (
                    <p>Loading Events ...</p>
                ) : (
                    <>
                        {names.length > 0 ? (
                            names.map((name, index) => (
                                <div key={index} onMouseEnter={() => setOpenIndex(index)} onMouseLeave={() => setOpenIndex(null)}>
                                    {name}
                                    <Flag className="flag" code={sessions.find(element => element.country_name === name).country_code} height="16" />
                                    {openIndex === index && (
                                        <div className="dropdown-content">
                                            <h5>Location: {sessions.find(element => element.country_name === name).location}</h5>
                                            <h5>{new Date(sessions.find(element => element.country_name === name).date_end).toLocaleDateString()}</h5>
                                            {sessions.filter(element => element.country_name === name && element.session_name === 'Qualifying').map((session, sessionIndex) => (
                                                <button key={sessionIndex} onClick={() => handleClick(session)}>Qualifying</button>
                                            ))}
                                            {sessions.filter(element => element.country_name === name && element.session_name === 'Race').map((session, sessionIndex) => (
                                                <button key={sessionIndex} onClick={() => handleClick(session)}>Race</button>
                                            ))}
                                            {sessions.filter(element => element.country_name === name && element.session_name === 'Sprint').map((session, sessionIndex) => (
                                                <button key={sessionIndex} onClick={() => handleClick(session)}>Sprint</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No events found.</p>
                        )}
                    </>
                )}
            </div>

            <div className="upcoming-races">
                {loading ? (
                    <p>Loading Upcoming Races...</p>
                ) : (
                    <>
                        {upcomingRaces.length > 0 ? (
                            <div>
                                {upcomingRaces.map((race, index) => (
                                    <p key={index}>{race.description} - {race.date}</p>
                                ))}
                            </div>
                        ) : (
                            <p>No upcoming races.</p>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default F1EventSessions;
