import "./Savedpost.css";
import { Nav } from "../nav/Nav";
import { Rightchild1 } from "../my-account/Myaccount";
import { Homerightchild3 } from "../home/Home";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Ifnotloggedin } from "../if-not-logged-in/Ifnotloggedin";


// react toaster
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const base_url = "http://localhost:5000"; 

export function Savedpost() {

    const[savedposts, setSavedposts] = useState(null);

    useEffect(()=>{
        // Make a fetch call to see all blogs saved by the user. Get the user id from local storage & pass it as params in the url. Run this callback in useEffect only if user is looged in i.e.. _id stored in local storage
        if(localStorage.getItem("_id")){
            fetch(`${base_url}/sign/get-all-saved-posts/${localStorage.getItem("_id")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-auth-token": localStorage.getItem("token")
                }
            }).then((data)=>data.json()).then((data)=> setSavedposts(data))
        }
        
    },[])

  return (
    <div>
        {localStorage.getItem("_id") ? <div>
            <Nav />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div className="leftchild">
                    <h2 style={{textAlign: "center"}}>My Saved Blogs</h2>
                    <hr />
                    {/* {savedposts ? savedposts.map((ele,index)=> <Savedpostsubcomponent obj={ele} key={index} setSavedposts={setSavedposts} />) : "Loading"} */}
                    {savedposts ? 
                        <div>
                            {savedposts[0] ? savedposts.map((ele,index)=> <Savedpostsubcomponent obj={ele} key={index} setSavedposts={setSavedposts} />) : <h4 style={{textAlign: "center", color: "red"}}>No saved posts by user. Start saving or bookmarking post to read later.</h4>}
                        </div>
                    : "Loading"}
                </div>
                <div className="rightchild">
                    <Rightchild1 />
                    <hr />
                    <Homerightchild3 />
                </div>
            </div>
        </div> : <Ifnotloggedin />}
        <ToastContainer />
    </div>
  )
}





export function Savedpostsubcomponent({obj, setSavedposts}) {

    const navigate = useNavigate();

    let short_des = obj.blog_info.story;
    short_des = short_des.slice(0,10)

  return (
    <div className='parenttonormal'>
            <div className="normalcomponent">
                <div className="normalcomponentleftchild">
                    <div className="topcol">
                        <div onClick={()=>navigate(`/author-specific/${obj.user_info._id}`)} style={{display:"flex", alignItems: "center", cursor: "pointer", gap: "8px"}}>
                            <img className='authorimage' src={obj.user_info.profile_pic} alt={obj.user_info.name} />
                            <p className='authorname'>{obj.user_info.name}</p>
                        </div>
                        <p style={{display:"flex", alignItems: "center"}} className='date'><CalendarMonthIcon /> {obj.blog_info.date}</p>
                        <p style={{display:"flex", alignItems: "center", gap: "8px", color: "grey"}}><i className="fa-solid fa-tags" />  {obj.blog_info.tag}</p>
                        <p style={{display:"flex", alignItems: "center", gap: "8px", color: "grey"}}><AccessTimeIcon /> {obj.blog_info.time_to_read + " min read"}</p>
                    </div>
                    <div className="midcol">
                        {/* Update the navigate link as you proceed */}
                        <h3 onClick={()=> navigate(`/open-a-blog/${obj.blog_info._id}`)}>{obj.blog_info.title}</h3>
                        <p onClick={()=> navigate(`/open-a-blog/${obj.blog_info._id}`)}>{short_des}.....</p>
                    </div>
                    <div className="editdelcol">
                        {/* on click makes a fetch call to the API & deletes it. The same API also returns the updated saved blogs from the users after deleting it. The updated blogs array is again set using setState method to re-render the updated list locally. */}
                        <Button 
                            // You wiil need to senfd the blog id as well ass the user id. Their matching combo gets deleted. Make a POST fetch call with both the data.
                            onClick={()=>{
                                // alert("Are you sure you want to remove this from your saved blogs.");
                                const data2send = {
                                    blog_id: obj.blog_id,
                                    loggeduserid : obj.author_id
                                }
                                fetch(`${base_url}/sign/delete-a-saved-post`, {
                                    method: "POST",
                                    body: JSON.stringify(data2send),
                                    headers: {
                                        "content-type" : "application/json",
                                        "x-auth-token": localStorage.getItem("token")
                                    }
                                }).then((data)=>data.json()).then((data)=>{
                                    // Set the updated blog list using setState
                                    setSavedposts(data)
                                    toast.success("Successfully removed the post from your saved posts or bookmarks")
                                });
                            }}
                            variant="outlined" 
                            startIcon={<DeleteIcon />}>
                            Remove from saved post
                        </Button>
                    </div>
                </div>
                <div className="normalcomponentrightchild">
                    <img className='contentimage' src={obj.blog_info.blog_pic} alt={obj.blog_info.title} />
                </div>
            </div>
            <hr />
        </div>
  )
}

