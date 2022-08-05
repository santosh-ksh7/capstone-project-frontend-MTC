import "./Ifnotloggedin.css";
import Button from '@mui/material/Button';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {useNavigate, Link} from "react-router-dom";




export function Ifnotloggedin() {

  const navigate = useNavigate();

  return (
    <div style={{display: "grid", placeContent: "center", minHeight: "100vh", backgroundColor: "wheat"}}>
        <h2 style={{textAlign: "center"}}>Hello from MyTravelCompanion</h2>
        <h4 style={{textAlign: "center"}}>To get access to all the features you need to be logged-in</h4>
        <ul style={{listStyleType: "none", color: "green", textAlign: "center"}}>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon style={{color: "green"}} />Write a blog post of your own</li>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon style={{color: "green"}}/>Access all your published blogs </li>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon style={{color: "green"}} />Edit your published blogs</li>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon style={{color: "green"}} />Delete your published blogs</li>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon style={{color: "green"}} />Save a post for read later</li>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon  style={{color: "green"}} />View comments on a post</li>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon style={{color: "green"}} />Comment on a post</li>
            <li style={{display: "flex", alignItems: "center", gap: "8px"}}><DoneAllIcon style={{color: "green"}} />Like a post</li>
        </ul>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Button variant="contained" onClick={()=> navigate("/login")}>Sign-in</Button >
          <Button variant="contained" onClick={()=>navigate("/home")}>Go back to Home</Button >
        </div>
        <p style={{textAlign: "center", marginTop: "25px"}}><Link to="/create-account">New to MyTravelCompanion? Create Account.</Link></p>
    </div>
  )
}
