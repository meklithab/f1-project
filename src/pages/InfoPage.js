// src/components/InfoPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function InfoPage() {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
                <h1 className="text-2xl font-extrabold text-maroon-800 mb-2">MEKLIT HABTAMU HOSISO</h1>
                <p className="text-base text-gray-800 mb-6">
                    Welcome to my info page! You can find my profiles below:
                </p>
                <div className="flex justify-center gap-4">
                    <a href="https://github.com/meklithab" className="text-red-800 font-bold text-base hover:text-red-600" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/meklit-habtamu-222400295/" className="text-red-800 font-bold text-base hover:text-red-600" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </div>
                <button onClick={()=>navigate("/")} className="mt-4 p-2 bg-red-800 text-white rounded hover:bg-red-600">
                    Back to Home
                </button>
            </div>

        </div>
    );
}

export default InfoPage;
