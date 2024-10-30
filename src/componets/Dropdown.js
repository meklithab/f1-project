import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Dropdown.css";
import races from "../images/fp1/races.jpg"
import drivers from "../images/fp1/dnd.jpg"
import teams from "../images/fp1/teams.jpg"
import standings from "../images/fp1/standings.jpg"

export default function Dropdown(props) {
    const [isOpen, setOpen] = useState(false);
    const { title, content } = props;
    const [src, setSrc] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        switch (title) {
            case 'Races':
                setSrc(races)
                break;
            case 'Drivers':
                setSrc(drivers)
                break;
            case 'Teams':
                setSrc(teams)
                break;
            case 'Standings':
                setSrc(standings)
                break;
            default:
                break;
        }
    }, [title]);

    const handleItems = () => {
        switch (title) {
            case 'Races':
                navigate('/races');
                break;
            case 'Drivers':
                navigate('/drivers');
                break;
            case 'Teams':
                navigate('/teams');
                break;
            case 'Standings':
                navigate('/Standings');
                break;
            default:
                break;
        }
    };



    return (
        <div
            className="container-2"
            style={{ backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className='row-2'>
                <div
                    className='col-2'
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    onClick={handleItems}
                >
                    {title}
                    {isOpen && (
                        <div className="dropdown-content">
                            {content}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
