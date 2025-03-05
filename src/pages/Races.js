import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import img from "../images/fp1/redblack.jpg"

import "../style/Races.css"
import NavBar from '../componets/NavBar';

const F1EventSessions = () => {
    const f1RaceLocations = useMemo(() => ([
        { country: "Australia", description: "Australian Grand Prix", date: "2025-03-16" },
        { country: "China", description: "Chinese Grand Prix", date: "2025-03-23" },
        { country: "Japan", description: "Japanese Grand Prix", date: "2025-04-06" },
        { country: "Bahrain", description: "Bahrain Grand Prix", date: "2025-04-13" },
        { country: "Saudi Arabia", description: "Saudi Arabian Grand Prix", date: "2025-04-20" },
        { country: "United States", description: "Miami Grand Prix", date: "2025-05-04" },
        { country: "Italy", description: "Emilia Romagna Grand Prix", date: "2025-05-18" },
        { country: "Monaco", description: "Monaco Grand Prix", date: "2025-05-25" },
        { country: "Spain", description: "Spanish Grand Prix", date: "2025-06-01" },
        { country: "Canada", description: "Canadian Grand Prix", date: "2025-06-15" },
        { country: "Austria", description: "Austrian Grand Prix", date: "2025-06-29" },
        { country: "United Kingdom", description: "British Grand Prix", date: "2025-07-06" },
        { country: "Belgium", description: "Belgian Grand Prix", date: "2025-07-27" },
        { country: "Hungary", description: "Hungarian Grand Prix", date: "2025-08-03" },
        { country: "Netherlands", description: "Dutch Grand Prix", date: "2025-08-31" },
        { country: "Italy", description: "Italian Grand Prix", date: "2025-09-07" },
        { country: "Azerbaijan", description: "Azerbaijan Grand Prix", date: "2025-09-21" },
        { country: "Singapore", description: "Singapore Grand Prix", date: "2025-10-05" },
        { country: "United States", description: "United States Grand Prix", date: "2025-10-19" },
        { country: "Mexico", description: "Mexican Grand Prix", date: "2025-10-26" },
        { country: "Brazil", description: "Brazilian Grand Prix", date: "2025-11-09" },
        { country: "United States", description: "Las Vegas Grand Prix", date: "2025-11-22" },
        { country: "Qatar", description: "Qatar Grand Prix", date: "2025-11-30" },
        { country: "United Arab Emirates", description: "Abu Dhabi Grand Prix", date: "2025-12-07" }
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
                //To get current years data: ${ new Date().getFullYear() }
                const apiUrl = `https://api.openf1.org/v1/sessions?year=2024`;
                const response = await axios.get(apiUrl);

                if (response.data) {
                    const allSessions = response.data;

                    // Filter sessions for Qualifying, Sprint, and Race
                    const filteredSessions = allSessions.filter(session =>
                        session.session_name === 'Qualifying' ||
                        session.session_name === 'Sprint' ||
                        session.session_name === 'Race'
                    );
                    setSessions(filteredSessions);



                    // Combine country_name and location to create a unique identifier
                    const locationNames = filteredSessions.map(element => ({
                        country_name: element.country_name,
                        location: element.location
                    }));
                    const uniqueLocationNames = [
                        ...new Map(locationNames.map(item => [`${item.country_name}-${item.location}`, item])).values()
                    ];
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

    function formatDate(dateString) {
        const options = { month: 'short', day: 'numeric' };
        const date = new Date(dateString);

        return date.toLocaleDateString('en-US', options);
    }



    return (
        <>



            <div className='race-main'>

                <div className='top-image' style={{ backgroundImage: `url(${img})`, backgroundSize: 'contain' }} >
                    <NavBar />

                </div>

                <div className="main-container">
                    <div className='past-races'>
                        {loading ? (
                            <>
                            <div style={{ margin: '5px', fontSize: "19px", fontWeight: 'bold', color: 'red' }}>PAST 2024 RACES RESULTS</div>
                            <p style={{ color: "white" }}>Loading Past Sessions...</p>
                        </>
                        ) : (
                            <>

                                <div className="cont-race">
                                    <div style={{ margin: '5px', fontSize: "19px", fontWeight: 'bold', color: 'red' }}>PAST 2024 RACES RESULTS</div>
                                    {names.length > 0 ? (
                                        names.map((name, index) => (
                                            <div className="country-container" key={index} onClick={() => setOpenIndex(index)}>
                                                <p className="country-name"> {`${name.country_name.toUpperCase()} (${name.location})`}</p>
                                                {openIndex === index && (
                                                    <div className="dropdown-content">
                                                        <h5 className="location"># {name.location}</h5>
                                                        <h5 className="date">
                                                            # {formatDate(new Date(sessions.find(
                                                                element => element.country_name === name.country_name && element.location === name.location
                                                            ).date_end))}
                                                        </h5>
                                                        {sessions.filter(element => element.country_name === name.country_name && element.location === name.location && element.session_name === 'Qualifying').map((session, sessionIndex) => (
                                                            <button className="buttons" key={sessionIndex} onClick={() => handleClick(session)}>QUALIFYING</button>
                                                        ))}
                                                        {sessions.filter(element => element.country_name === name.country_name && element.location === name.location && element.session_name === 'Race').map((session, sessionIndex) => (
                                                            <button className="buttons" key={sessionIndex} onClick={() => handleClick(session)}>RACE</button>
                                                        ))}
                                                        {sessions.filter(element => element.country_name === name.country_name && element.location === name.location && element.session_name === 'Sprint').map((session, sessionIndex) => (
                                                            <button className="buttons" key={sessionIndex} onClick={() => handleClick(session)}>SPRINT</button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No events found.</p>
                                    )}
                                </div>

                            </>
                        )}

                    </div>

                    <div className="upcoming-races">
                        <h2 class="font-bold m-1 font-6 text-xl " style={{ fontWeight: 'bolder', color: 'red' }}>UPCOMING RACES</h2>
                        {loading ? (
                            <p>Loading Upcoming Races...</p>
                        ) : (
                            <>
                                {upcomingRaces.length > 0 ? (
                                    <div>
                                        {upcomingRaces.map((race, index) => (
                                            <div key={index} class="flex justify-between " >
                                                <div class="ml-1 font-bold inline ">{race.description}</div>
                                                <div class="inline"> {formatDate(race.date)}</div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No upcoming races.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default F1EventSessions;
