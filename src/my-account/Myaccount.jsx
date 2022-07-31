import "./Myaccount.css";
import { Nav } from '../nav/Nav.jsx';
import { Homerightchild3 } from "../home/Home";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';



const base_url = "http://localhost:5000"; 


export function Myaccount() {

    // It is coming from the local storage (the _id of logged in user dynamically)
    let uuid, token;

    const [userdata, setUserdata] = useState(null)

    useEffect(() => {
        uuid = localStorage.getItem("_id");
        token = localStorage.getItem("token");
        if(uuid && token){
            fetch(`${base_url}/individual-user-info/${uuid}`).then((data)=>data.json()).then((data)=>{setUserdata(data); console.log(data);})
        }
    }, [])
    

  return (
    <div>
        <Nav />
        <div style={{display: "flex"}}>
            <div className="leftchild">
                {userdata ? <Leftchild1 obj={userdata} /> : "Loading..."}
            </div>
            <div className="rightchild">
                <Rightchild1 />
                <hr />
                <Homerightchild3 />
            </div>
        </div>
    </div>
  )
}


export function Leftchild1({obj}){
    return(
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div className="leftpart">
                <h2>Account Info</h2>
                <p style={{textAlign: "left", display: "flex", alignItems: "center", gap: "5px"}}><strong>Name: </strong>{obj.name}</p>
                {/* conditional rendering only if users have given About/bio */}
                {obj.about!== "" ? <p style={{textAlign: "left", display: "flex", alignItems: "flex-start", gap: "5px"}}><strong>About: </strong>{obj.about}</p> : null}
                <p style={{textAlign: "left", display: "flex", alignItems: "center", gap: "5px"}}><strong><EmailIcon/></strong>{obj.email}</p>
                {/* conditional rendering only if users have given therie social media handles */}
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    {obj.fb_link!== "" ? <a href={obj.fb_link} target="_blank" > <FacebookIcon/></a> : null}
                    {obj.insta_link!== "" ? <a href={obj.insta_link} target="_blank" > <InstagramIcon/></a> : null}
                    {obj.twitter_link!== "" ? <a href={obj.twitter_link} target="_blank" > <TwitterIcon/></a> : null}
                </div>
            </div>
            <div className="rightpart">
                <img className="maimg" src={obj.profile_pic} alt={obj.name} />
            </div>
        </div>
    )
}


export function Rightchild1() {
  return (
    <div style={{textAlign: "center", marginBottom: "15px"}}>
        <h2>Quick Links</h2>
        <div className="ri8chld1">
            <Link style={{textDecoration: "none"}} to="/my-account/update-account">Update account info</Link>
            <Link style={{textDecoration: "none"}} to="">My published blogs</Link>
            <Link style={{textDecoration: "none"}} to="">My liked blogs</Link>
            <Link style={{textDecoration: "none"}} to="">My saved blogs</Link>
            <Link style={{textDecoration: "none"}} to="">Update password</Link>
            <Link style={{textDecoration: "none"}} to="">Delete account</Link>
            <Link style={{textDecoration: "none"}} to="">Sign-out</Link>
        </div>
    </div>
  )
}
