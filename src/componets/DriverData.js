

import "./DriverData.css"
import Flag from 'react-world-flags'

const DriversData = ({ data }) => {


    return (
        <>

            <h1>Drivers List</h1>

            {data.map((driver, index) => (
                <div key={index}>
                    <img src={driver.headshot_url} alt="Driver_img" />
                    <p>{driver.full_name}</p>
                    <p>{driver.driver_number}</p>
                    <p>{driver.country_code}
                        <Flag code={driver.country_code} height="16" />

                    </p>
                    <p>{driver.team_name}</p>
                </div>
            ))}

        </>
    );
}

export default DriversData;

