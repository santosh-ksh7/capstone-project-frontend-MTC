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
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


// DIalog box until the upload process happens
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const base_url = "http://localhost:5000"; 


export function Myaccount() {

    const [userdata, setUserdata] = useState(null)

    useEffect(() => {
        if(localStorage.getItem("_id") && localStorage.getItem("token")){
            fetch(`${base_url}/individual-user-info/${localStorage.getItem("_id")}`, {
                method: "GET",
                headers: {
                    "content-type" : "application/json",
                    "x-auth-token": localStorage.getItem("token")
                }
            }).then((data)=>data.json()).then((data)=>{setUserdata(data); console.log(data);})
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


    // dialog-box logic from material UI
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    // dialog-box logic from material UI

     // dialog-box logic from material UI for 2nd dailogue
     const [open1, setOpen1] = useState(false);

     const handleClickOpen1 = () => {
       setOpen1(true);
     };
 
     const handleClose1 = () => {
       setOpen1(false);
     };
     // dialog-box logic from material UI for 2nd dailogue


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
                    onClick={()=> {
                        handleClickOpen()
                    }}>
                    Delete account
                </button>
            </div>
        </div>
        <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{textAlign: "center"}}>{"Sorry to see you go"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <h3 style={{textAlign: "center", color: "black"}}>Are you sure you want to delete your account permanently.</h3>
                    <p style={{textAlign: "center", color: "red"}}>Deleting will delete all your blogs, comment, likes, bookmark.</p>
                    <p style={{textAlign: "center", color: "red"}}>It is a 1-way process. You can't undo your actions</p>
                    <div style={{display: "flex", justifyContent: "space-around"}} className="btncont">
                    <Button variant="outlined" startIcon={<DeleteIcon />} 
                        onClick={() => {
                            handleClose();
                            handleClickOpen1();
                             
                            // This should be performed on pressing the confirm button

                            // get hold of _id from local storage
                            const data2send = {
                                _id: localStorage.getItem("_id")
                            }
                            // first perform cleanup in DB
                            fetch(`${base_url}/sign/delete-my-account`, {
                                method: "POST",
                                body: JSON.stringify(data2send),
                                headers: {
                                    "content-type": "application/json"
                                }
                            }).then((data) => data.json()).then((data) => alert(data.msgPass))
                            // // now sign-out
                            Signout(); 
                            // // Now send the user to landing page
                            navigate("/");
                        }}
                    >
                        Proceed to Delete account
                    </Button>
                    <Button  onClick={handleClose} variant="outlined">Choose to stay</Button>
                    </div> 
                </DialogContentText>
                </DialogContent>
            </Dialog>
            <Dialog
                open={open1}
                keepMounted
                onClose={handleClose1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle style={{textAlign: "center"}}>{"Delete in progress"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <h3 style={{textAlign: "center", color: "black"}}>Hold on while we perform cleanup & delete your account.</h3>
                    <p style={{textAlign: "center", color: "black"}}>Until then avoid pressing any button or clicking anywhere else.</p>
                    <img style={{width: "200px", height: "200px", objectFit: "cover"}} src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="Loading gif" />
                </DialogContentText>
                </DialogContent>
            </Dialog>
    </div>
  )
}
