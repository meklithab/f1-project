import NavBar from "../componets/NavBar";
import img from "../images/fp1/redblack.jpg"

const Teams = () => {

    return( 
    <div style={{backgroundColor:"black",height:"100vh"}}>
            <div className='top-image' style={{ backgroundImage: `url(${img})`, backgroundSize: 'contain' }} >
                <NavBar />

            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems:"center"

            }}>   
<h1 style={{ color:"white",fontWeight:"bolder", display: "flex", justifyContent: "center", alignItems: "center" ,margin:"5rem"}}>Data not available.</h1>
            </div>
    </div>
    )

};

export default Teams