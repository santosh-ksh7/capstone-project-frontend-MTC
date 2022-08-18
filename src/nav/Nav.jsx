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
            fetch(`${base_url}/individual-user-info/${localStorage.getItem("_id")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-auth-token" : localStorage.getItem("token")
                }
            }).then((data)=>data.json()).then((data)=>{setUserdata(data)})
        }
    }, [])
   
    

    return (
          <div className='topnavbar'>
              <div className="topbarlogodes">
                  <h2 style={{margin: "9px", color: "yellow"}}>MyTravelCompanion</h2>
              </div>
              <div className='topbarlinks'>
                  <Link className="linkstyle" style={{textDecoration: "none", color: "wheat"}} to="/" >About</Link>
                  <Link className="linkstyle" style={{textDecoration: "none", color: "wheat"}} to="/home" >Home</Link>
                  <Link className="linkstyle" style={{textDecoration: "none", color: "wheat"}} to="/write" >Write</Link>
                  {/* The image has to be fetched from users DB bu using author_id stored in local storage upon successfull login. This step has to be done in useEffect if jwt & uuid is true. */}
                  {userdata ? <img onClick={()=>navigate("/my-account")} className="navbarpp" src={userdata.profile_pic} alt={userdata.name} /> : <Link className="linkstyle" style={{textDecoration: "none", color: "wheat"}} to="/login" >Sign-in</Link>}
                  {/* delete after designing my-account page. Coz sign-out should only be available there
                  <Link onClick={Signout} style={{textDecoration: "none", color: "wheat"}} to="/" >Sign-out</Link> */}
              </div>
          </div>
    )
}
