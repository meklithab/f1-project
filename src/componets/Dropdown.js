import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';




export default function Dropdown(props) {
    const [isOpen, setOpen] = useState(false);
    const selectedItem = props.title;

    let navigate = useNavigate()



    const handleItems = () => {
        console.log(props.title);
        console.log(selectedItem);
        switch (selectedItem) {
            case 'Races':
                navigate('/races')

                break;
            case 'Drivers':
                navigate('/drivers')
                break;
            case 'Teams':
                navigate('/teams')
                break;
            case 'Standings':
                navigate('Standings')
                break;

            default:
                break;
        }



    };

    return (
        <>
            <div className="container">
                <button
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    onClick={handleItems}
                >
                    {props.title}
                    {isOpen && (
                        <div className="dropdown-content">
                            {props.content}
                        </div>
                    )}
                </button>

            </div>
        </>
    );
}
