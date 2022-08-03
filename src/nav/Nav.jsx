import "./Nav.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";


const base_url = "http://localhost:5000"; 

// Navbar
export function Nav() {

    const navigate = useNavigate();

    const [userdata, setUserdata] = useState(null)
    
    useEffect(() => {
        if(localStorage.getItem("_id") && localStorage.getItem("token")){
            fetch(`${base_url}/individual-user-info/${localStorage.getItem("_id")}`).then((data)=>data.json()).then((data)=>{setUserdata(data)})
        }
    }, [])
   

    // delete after designing my-account page. Coz sign-out should only be available there
    function Signout(){
        localStorage.removeItem("_id");
        localStorage.removeItem("token");
    }

    

    return (
          <div className='topnavbar'>
              <div className="topbarlogodes">
                  <h2 style={{margin: "9px", color: "yellow"}}>MyTravelCompanion</h2>
              </div>
              <div className='topbarlinks'>
                  <Link style={{textDecoration: "none", color: "wheat"}} to="/" >About</Link>
                  <Link style={{textDecoration: "none", color: "wheat"}} to="/home" >Home</Link>
                  <Link style={{textDecoration: "none", color: "wheat"}} to="/write" >Write</Link>
                  {/* The image has to be fetched from users DB bu using author_id stored in local storage upon successfull login. This step has to be done in useEffect if jwt & uuid is true. */}
                  {userdata ? <img onClick={()=>navigate("/my-account")} className="navbarpp" src={userdata.profile_pic} alt={userdata.name} /> : <Link style={{textDecoration: "none", color: "wheat"}} to="/login" >Sign-in</Link>}
                  {/* delete after designing my-account page. Coz sign-out should only be available there */}
                  <Link onClick={Signout} style={{textDecoration: "none", color: "wheat"}} to="/" >Sign-out</Link>
              </div>
          </div>
    )
}
