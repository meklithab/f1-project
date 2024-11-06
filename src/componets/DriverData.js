

import "../style/DriversData.css"

const DriversData = ({ data }) => {


    return (
        <>


            <div className="main-driver">
                <table >

                    <tr >
                        <th ></th>
                        <th >Name</th>
                        <th >Driver Number</th>
                        <th >Country</th>
                        <th >Team</th>
                    </tr>

                    {data.map((driver, index) => (

                      <tr key={index}>
                            <td><img src={driver.headshot_url} alt="Driver_Image" /></td>
                            <td><p className="driver-name">{driver.full_name}</p></td>
                            <td> <p className="driver-num">{driver.driver_number}</p></td>
                            <td><p>{driver.country_code} </p></td>
                            <td><p className="driver-team">{driver.team_name}</p></td>


                        </tr>


                    ))}
                </table>
            </div>

        </>
    );
}

export default DriversData;

