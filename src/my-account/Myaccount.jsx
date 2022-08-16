import "./Myaccount.css";
import { Nav } from '../nav/Nav.jsx';
import { Homerightchild3 } from "../home/Home";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import{useNavigate} from "react-router-dom";
import {Ifnotloggedin} from "../if-not-logged-in/Ifnotloggedin";



const base_url = "http://localhost:5000"; 


export function Myaccount() {

    const [userdata, setUserdata] = useState(null)

    useEffect(() => {
        if(localStorage.getItem("_id") && localStorage.getItem("token")){
            fetch(`${base_url}/individual-user-info/${localStorage.getItem("_id")}`).then((data)=>data.json()).then((data)=>{setUserdata(data); console.log(data);})
        }
    }, [])
    

  return (
    <div>
        {localStorage.getItem("_id") ? <div>
            <Nav />
            <div style={{display: "flex"}}>
                <div className="leftchild">
                    <h2 style={{textAlign: "center"}}>Account Info</h2>
                    <hr />
                    {userdata ? <Leftchild1 obj={userdata} /> : "Loading..."}
                </div>
                <div className="rightchild">
                    <Rightchild1 />
                    <hr />
                    <Homerightchild3 />
                </div>
            </div>
        </div> : <Ifnotloggedin />}
    </div>
  )
}


export function Leftchild1({obj}){
    return(
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <div className="leftpart">
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


    // delete after designing my-account page. Coz sign-out should only be available there
    function Signout(){
        localStorage.removeItem("_id");
        localStorage.removeItem("token");
    }

    const navigate = useNavigate();

  return (
    <div style={{textAlign: "center", marginBottom: "15px"}}>
        <h2>Quick Links</h2>
        <div className="ri8chld1">
            <Link style={{textDecoration: "none"}} to="/my-account">My account info</Link>
            <Link style={{textDecoration: "none"}} to="/my-account/update-account">Update account info</Link>
            <Link style={{textDecoration: "none"}} to="/my-account/published-blogs">My published blogs</Link>
            <Link style={{textDecoration: "none"}} to="/my-account/liked-blogs">My liked blogs</Link>
            <Link style={{textDecoration: "none"}} to="/my-account/saved-blogs">My saved blogs</Link>
            <div style={{display: "flex", justifyContent: "space-between", marginTop: "15px", marginBottom: "15px"}}>
                <button 
                    style={{cursor: "pointer", color: "white", backgroundColor: "blue", borderRadius: "10px", padding: "5px"}}
                    onClick={()=> {
                        Signout();
                        navigate("/forgot-password-1");
                    }}>
                    Update password
                </button>
                <button
                    style={{cursor: "pointer", color: "white", backgroundColor: "green", borderRadius: "10px", padding: "5px"}} 
                    onClick={()=> {
                        Signout(); 
                        navigate("/");
                    }}>
                    Sign-out
                </button>
                <button 
                    style={{cursor: "pointer", color: "white", backgroundColor: "red", borderRadius: "10px", padding: "5px"}}
                    onClick={()=> {navigate("");}}>
                    Delete account
                </button>
            </div>
        </div>
    </div>
  )
}
