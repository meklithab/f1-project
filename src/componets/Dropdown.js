import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/Dropdown.css";

export default function Dropdown(props) {
    const [isOpen, setOpen] = useState(false);
    const { title, content } = props;
    const navigate = useNavigate();

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
        <div className="container-2">
            <div className='row-2'>
                <button
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
                </button>
            </div>
        </div>
    );
}
