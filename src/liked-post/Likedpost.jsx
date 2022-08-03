import "./Likedpost.css";
import { Nav } from "../nav/Nav";
import { Rightchild1 } from "../my-account/Myaccount";
import { Homerightchild3 } from "../home/Home";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';



const base_url = "http://localhost:5000";

export function Likedpost() {

    const[likedposts, setLikedposts] = useState(null);

    useEffect(()=>{
        // Make a fetch call to see all liked blogs by the user. Get the user id from local storage & pass it as params in the url. Run this callback in useEffect only if user is looged in i.e.. _id stored in local storage
        if(localStorage.getItem("_id")){
            fetch(`${base_url}/sign/get-all-liked-posts/${localStorage.getItem("_id")}`).then((data)=>data.json()).then((data)=> setLikedposts(data))
        }
        
    },[])

    return (
        <div>
            <Nav />
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div className="leftchild">
                    <h2 style={{textAlign: "center"}}>My Liked Blogs</h2>
                    <hr />
                    {likedposts ? likedposts.map((ele,index)=> <Likedpostsubcomponent obj={ele} key={index} setLikedposts={setLikedposts} />) : "Loading"}
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




export function Likedpostsubcomponent({obj, setLikedposts}) {

    const navigate = useNavigate();

    let short_des = obj.blog_info.story;
    short_des = short_des.slice(0,10)

  return (
    <div className='parenttonormal'>
            <div className="normalcomponent">
                <div className="normalcomponentleftchild">
                    <div className="topcol">
                        <div style={{display:"flex", alignItems: "center", gap: "8px"}}>
                            <img className='authorimage' src={obj.user_info.profile_pic} alt={obj.user_info.name} />
                            <p className='authorname'>{obj.user_info.name}</p>
                        </div>
                        <p style={{display:"flex", alignItems: "center", gap: "8px"}} className='date'><CalendarMonthIcon /> {obj.blog_info.date}</p>
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
                                alert("Are you sure you want to remove this from your liked blogs.");
                                const data2send = {
                                    blog_id: obj.blog_id,
                                    loggeduserid : obj.author_id
                                }
                                fetch(`${base_url}/sign/delete-a-liked-post`, {
                                    method: "POST",
                                    body: JSON.stringify(data2send),
                                    headers: {
                                        "content-type" : "application/json"
                                    }
                                }).then((data)=>data.json()).then((data)=>{
                                    // Set the updated blog list using setState
                                    setLikedposts(data)
                                });
                            }}
                            variant="outlined" 
                            startIcon={<DeleteIcon />}>
                            Remove from liked post
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