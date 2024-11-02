import { useNavigate } from "react-router-dom"
import logo from "../images/fp1/logo.png"

export default function NavBar() {
    const navigate = useNavigate()
    return (
        <div className='section-1'>
            <img className='logo' src={logo} alt='logo' />
            <ul className='menu'>
                <li className='options'  onClick={() => navigate("/")}>Home</li>
                <li className='options'  onClick={() => navigate("/races")}>Races</li>
                <li className='options'  onClick={() => navigate("/drivers")}>Drivers</li>
                <li className='options'  onClick={() => navigate("/teams")}>Teams</li>
                <li className='options'  onClick={() => navigate("/Standings")}>Standings</li>


            </ul>

        </div>
    )
}