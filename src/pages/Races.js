import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import img from "../images/fp1/redblack.jpg"

import "../style/Races.css"
import NavBar from '../componets/NavBar';

const F1EventSessions = () => {
    const f1RaceLocations = useMemo(() => ([
        { country: "Bahrain", description: "Bahrain Grand Prix", date: "2024-03-03" },
        { country: "Saudi Arabia", description: "Saudi Arabian Grand Prix", date: "2024-03-10" },
        { country: "Australia", description: "Australian Grand Prix", date: "2024-03-24" },
        { country: "China", description: "Chinese Grand Prix", date: "2024-04-07" },
        { country: "Azerbaijan", description: "Azerbaijan Grand Prix", date: "2024-04-21" },
        { country: "United States", description: "Miami Grand Prix", date: "2024-05-05" },
        { country: "Italy", description: "Emilia Romagna Grand Prix", date: "2024-05-19" },
        { country: "Monaco", description: "Monaco Grand Prix", date: "2024-05-26" },
        { country: "Spain", description: "Spanish Grand Prix", date: "2024-06-09" },
        { country: "Canada", description: "Canadian Grand Prix", date: "2024-06-23" },
        { country: "Austria", description: "Austrian Grand Prix", date: "2024-06-30" },
        { country: "United Kingdom", description: "British Grand Prix", date: "2024-07-07" },
        { country: "Hungary", description: "Hungarian Grand Prix", date: "2024-07-21" },
        { country: "Belgium", description: "Belgian Grand Prix", date: "2024-07-28" },
        { country: "Netherlands", description: "Dutch Grand Prix", date: "2024-08-25" },
        { country: "Italy", description: "Italian Grand Prix", date: "2024-09-01" },
        { country: "Singapore", description: "Singapore Grand Prix", date: "2024-09-15" },
        { country: "Japan", description: "Japanese Grand Prix", date: "2024-09-22" },
        { country: "United States", description: "United States Grand Prix", date: "2024-10-20" },
        { country: "Mexico", description: "Mexican Grand Prix", date: "2024-10-27" },
        { country: "Brazil", description: "Brazilian Grand Prix", date: "2024-11-10" },
        { country: "United States", description: "Las Vegas Grand Prix", date: "2024-11-24" },
        { country: "Qatar", description: "Qatar Grand Prix", date: "2024-12-01" },

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
