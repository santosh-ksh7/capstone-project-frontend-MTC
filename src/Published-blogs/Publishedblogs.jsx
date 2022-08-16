import "./Publishedblogs.css";
import { Rightchild1 } from "../my-account/Myaccount";
import { Homerightchild3 } from "../home/Home";
import { Nav } from '../nav/Nav.jsx';
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Ifnotloggedin } from "../if-not-logged-in/Ifnotloggedin";


// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const base_url = "http://localhost:5000"

export function Publishedblogs() {

    const[blogsofuser, setBlogsofuser] = useState(null);

    useEffect(()=>{
        if(localStorage.getItem("_id")){
            fetch(`${base_url}/sign/get-all-blogs/${localStorage.getItem("_id")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "x-auth-token": localStorage.getItem("token")
                }
            }).then((data)=>data.json()).then((data)=>setBlogsofuser(data))
        }
    }, [])

  return (
    <div>
        {localStorage.getItem("_id") ? <div>
            <Nav />
            <div className="pubparent">
                <div className="publeftchild">
                    <h2 style={{textAlign: "center"}}>My Published Blogs</h2>
                    <hr />
                    {blogsofuser ? 
                    <div>
                        {blogsofuser[0] ? blogsofuser.map((ele,index)=> <Blogsbyuser obj={ele} key={index} setBlogsofuser={setBlogsofuser} />) : <h4 style={{textAlign: "center", color: "red"}}>No published blogs by user. Start writting your own blogs.</h4>}
                    </div>
                    : "Loading..."}
                </div>
                <div className="pubri8child">
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




export function Blogsbyuser({obj, setBlogsofuser}) {

    const navigate = useNavigate();

    let short_des = obj.story;
    short_des = short_des.slice(0,10)

    return(
        <div className='parenttonormal'>
            <div className="normalcomponent">
                <div className="normalcomponentleftchild">
                    <div className="topcol">
                        <div onClick={()=>navigate(`/author-specific/${obj.user_info._id}`)} style={{display: "flex", alignItems: "center", gap: "8px", cursor: "pointer"}}>
                            <img className='authorimage' src={obj.user_info.profile_pic} alt={obj.user_info.name} />
                            <p className='authorname'>{obj.user_info.name}</p>
                        </div>
                        <p style={{display:"flex", alignItems: "center", gap : "8px"}} className='date'><CalendarMonthIcon /> {obj.date}</p>
                        <p style={{display:"flex", alignItems: "center", gap : "8px", color : "grey"}}><i className="fa-solid fa-tags" />  {obj.tag}</p>
                        <p style={{display:"flex", alignItems: "center", gap : "8px", color : "grey"}}><AccessTimeIcon /> {obj.time_to_read + " min read"}</p>
                    </div>
                    <div className="midcol">
                        {/* Update the navigate link as you proceed */}
                        <h3 onClick={()=> navigate(`/open-a-blog/${obj._id}`)}>{obj.title}</h3>
                        <p onClick={()=> navigate(`/open-a-blog/${obj._id}`)}>{short_des}.....</p>
                    </div>
                    <div className="editdelcol">
                        <Button 
                            // Redirect to edit page
                            onClick={()=>navigate(`/my-account/edit-a-blog/${obj._id}`)}
                            variant="outlined" 
                            startIcon={<EditIcon />}>
                            Edit
                        </Button>
                        {/* on click makes a fetch call to the API & deletes it. The same API also returns the updated all blogs from the users after deleting it. The updated blogs array is again set using setState method to re-render the updated list locally. */}
                        {/* When a blog is delted the blog should be deleted from liked collection, saved collection, comments collection & finally blogs collection. */}
                        <Button 
                            onClick={()=>{
                                // alert("Are you sure you want to delete yout published blogs.");
                                fetch(`${base_url}/sign/delete-a-post/${obj._id}`, {
                                    method: "GET",
                                    headers: {
                                        "content-type" : "application/json",
                                        "x-auth-token" : localStorage.getItem("token")
                                    }
                                }).then((data)=>data.json()).then((data)=>{
                                    toast.success(data.msg);
                                    setBlogsofuser(data.updateddata);
                                });
                            }}
                            variant="outlined" 
                            startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </div>
                </div>
                <div className="normalcomponentrightchild">
                    <img className='contentimage' src={obj.blog_pic} alt={obj.title} />
                </div>
            </div>
            <hr />
        </div>
    )
}