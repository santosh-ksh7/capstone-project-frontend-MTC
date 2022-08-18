import "./Openblog.css"
import { Nav } from '../nav/Nav.jsx';
import { Homerightchild3 } from "../home/Home";
import { Blogs } from "../home/Home";
import {Link} from "react-router-dom";
import {useParams, useNavigate} from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

// daialog box
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DoneAllIcon from '@mui/icons-material/DoneAll';

// react toaster notification
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const base_url = "http://localhost:5000"

export function Openblog() {

  const {id} = useParams();

  const user_uid = localStorage.getItem("_id")     // changed from hardcoding the data to using local storage info of logged in user

  const[specific_blog, setSpecific_blog] = useState(null);
  const[comments, setComments] = useState(null);
  const[logged_userinfo, setLogged_userinfo] = useState("");
  const[likeonmount, setLikeonmount] = useState(null);            // render like accordingly on mount 
  const[bookmarkonmount, setBookmarkonmount] = useState(null);    // render bookmark accordingly on mount 
  const[keepreadingdata, setKeepreadingdata] = useState([]);      // Keep reading data on mount
  const[morefromauthor, setMorefromauthor] = useState([]);        // more from author data on mount

  useEffect(() => {
    // using req.params in the backend. Get blog info based on it's id
    fetch(`${base_url}/open-a-blog/${id}`).then((data)=>data.json()).then((data)=>{setSpecific_blog(data)});
    // get all comments relatted to this specific blog
    fetch(`${base_url}/comments/${id}`).then((data)=>data.json()).then((data)=>{setComments(data)});
    // FOr like, bookmark & comments data to be as per user record, the user needs to be logged-in.
    if(localStorage.getItem("_id")){
      // the user ObjectId params to backend should be passed from the localstorage only if the user is logged in. This data is required by the comments component to show profile image & name of the user
      fetch(`${base_url}/individual-user-info/${localStorage.getItem("_id")}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      }).then((data)=>data.json()).then((data)=>{setLogged_userinfo(data)});
      // fetch call to render the like icon accordingly when the component first mounts
      let data2send= {"blog_id": id,"author_id": localStorage.getItem("_id")}
      fetch(`${base_url}/get-like-info`, {
        method: "POST",
        body : JSON.stringify(data2send),
        headers: {
          "content-type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      }).then((data)=>data.json()).then((data)=>{setLikeonmount(data.msg)})
      // fetch call to render the bookmark icon accordingly when the component first mounts
      let data2send1= {"blog_id": id,"author_id": localStorage.getItem("_id")}
      fetch(`${base_url}/get-bookmark-info`, {
        method: "POST",
        body : JSON.stringify(data2send1),
        headers: {
          "content-type": "application/json",
          "x-auth-token": localStorage.getItem("token")
        }
      }).then((data)=>data.json()).then((data)=>{setBookmarkonmount(data.msg)})
    }
    // fetch call for keepreading data i.e.. the bottom-most component & return any 2 blogs & sotre it in keepreadingdata variable from useSate
    fetch(`${base_url}/get-any-4-random-blogs`).then((data)=>data.json()).then((data)=>setKeepreadingdata(data))
    // fetch call for morefromauthor data i.e.. the right-most component & return any 2 blogs & sotre it in morefromauthor variable from useSate
    fetch(`${base_url}/more-from-author/${id}`).then((data)=>data.json()).then((data)=>{setMorefromauthor(data)})
  }, [id])
  

  return (
    <div>
        <Nav />
        <div>
            {specific_blog ? <Blogcomponent obj={specific_blog} comments={comments} setComments={setComments} logged_userinfo={logged_userinfo} likeonmount={likeonmount} setLikeonmount={setLikeonmount} blog_id={id} author_id={user_uid} bookmarkonmount={bookmarkonmount} setBookmarkonmount={setBookmarkonmount} keepreadingdata={keepreadingdata} morefromauthor={morefromauthor} /> : null}
        </div>
        <ToastContainer />
    </div>
  )
}



// Blog component
export function Blogcomponent({obj, comments, setComments, logged_userinfo, likeonmount, setLikeonmount, blog_id, author_id, bookmarkonmount, setBookmarkonmount, keepreadingdata, morefromauthor}) {

    const navigate = useNavigate();
  
    const[count, setCount] = useState(obj.clap);

    const[trackcomment, setTrackcomment] = useState(false);                  // to show / hide comments

    // dialog-box logic from material UI
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    // dialog-box logic from material UI


    

  return (
    <div style={{display: "flex"}}>
        <div className="indi_blog leftchild">
            <div className="toprow">
                    <p className="styleauthimg" title="Go to author specific page" onClick={()=>navigate(`/author-specific/${obj.user_info._id}`)} style={{display:"flex", alignItems: "center", gap: "8px", color: "black", cursor: "pointer"}}><img className='authorimage' src={obj.user_info.profile_pic} alt={obj.name} />{obj.user_info.name}</p>
                    <p style={{display:"flex", alignItems: "center", gap: "8px"}} className='date'><CalendarMonthIcon /> {obj.date}</p>
                    <p style={{display:"flex", alignItems: "center", gap: "8px"}}><AccessTimeIcon /> {obj.time_to_read + " min read"}</p>
                    <p style={{display:"flex", alignItems: "center", gap: "8px"}}><i className="fa-solid fa-tags" />  {obj.tag}</p>
            </div>
            <hr />
            <div className="midrow">
                <h2>{obj.title}</h2>
                <img src={obj.blog_pic} alt={obj.title} />
                <p className="firlet" style={{textAlign: "left"}}>{obj.story}</p>
            </div>
            {/* Render this as per user logged - in status */}
            {localStorage.getItem("_id") ? 
              <div className="lastrow" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                  <p className="icon1">
                      {likeonmount ?
                      <IconButton 
                        onClick={()=>{
                          toast.success("removed from liked post")
                          setLikeonmount(!likeonmount);
                          setCount(count-1);
                          // fetch call to decrement the like      --- the backend need not to return anything & use setCount to store updated like count only in locally
                          const data2send= {clap : count-1}
                          fetch(`${base_url}/alter-clap-count/${blog_id}`, {
                            method: "POST",
                            body: JSON.stringify(data2send),
                            headers: {
                              "content-type" : "application/json",
                              "x-auth-token": localStorage.getItem("token")
                            }
                          }).then(()=>console.log(data2send))
                          // fetch call to remove record to liked_posts collection     --- backend returns nothing
                          const data2remove = {blog_id: blog_id ,author_id: localStorage.getItem("_id")}
                          fetch(`${base_url}/alter-liked_posts/remove`, {
                            method: "POST",
                            body: JSON.stringify(data2remove),
                            headers: {
                              "content-type" : "application/json",
                              "x-auth-token": localStorage.getItem("token")
                            }
                          }).then(()=>console.log("data2remove", data2remove))
                        }}
                      >
                          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <ThumbDownIcon style={{color: "black", fontSize: "30px"}} />
                            <p style={{margin: "0px", fontSize: "14px", color: "black"}}>Unlike</p>
                          </div>
                      </IconButton>
                      :
                      <IconButton 
                        onClick={()=>{
                          toast.success("added to liked post")
                          setLikeonmount(!likeonmount);
                          setCount(count+1);
                          // fetch call to decrement the like      --- the backend need not to return anything & use setCount to store updated like count only in locally
                          const data2send= {clap : count+1}
                          fetch(`${base_url}/alter-clap-count/${blog_id}`, {
                            method: "POST",
                            body: JSON.stringify(data2send),
                            headers: {
                              "content-type" : "application/json",
                              "x-auth-token": localStorage.getItem("token")
                            }
                          }).then(()=>console.log(data2send))
                          // fetch call to add record to liked_posts collection     --- backend returns nothing
                          const data2put = {blog_id: blog_id ,author_id: localStorage.getItem("_id")}
                          fetch(`${base_url}/alter-liked_posts/add`, {
                            method: "POST",
                            body: JSON.stringify(data2put),
                            headers: {
                              "content-type" : "application/json",
                              "x-auth-token": localStorage.getItem("token")
                            }
                          }).then(()=>console.log("data2put", data2put))
                        }}
                      >
                          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <ThumbUpIcon style={{color: "blue", fontSize: "30px"}} />
                            <p style={{margin: "0px", fontSize: "15px", color: "black"}}>Like</p>
                          </div>
                      </IconButton>}
                      {count}
                  </p>
                  <p className="icon2">
                      {bookmarkonmount ?
                      <IconButton 
                        onClick={()=>{
                          toast.success("removed from saved posts")
                          setBookmarkonmount(!bookmarkonmount);
                          // fetch call to remove record from saved_posts collection
                          const data2remove_book = {blog_id: blog_id, author_id: localStorage.getItem("_id")}
                          fetch(`${base_url}/alter-saved_posts/remove`, {
                            method: "POST",
                            body: JSON.stringify(data2remove_book),
                            headers: {
                              "content-type" : "application/json",
                              "x-auth-token": localStorage.getItem("token")
                            }
                          }).then(()=>console.log(data2remove_book))
                        }}
                      >
                          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <BookmarkRemoveIcon style={{color: "#958c3a", fontSize: "30px"}} />
                            <p style={{margin: "0px", fontSize: "15px", color: "black"}}>Removed from saved post</p>
                          </div>
                      </IconButton>
                      :
                      <IconButton 
                        onClick={()=>{
                          toast.success("added to saved posts")
                          setBookmarkonmount(!bookmarkonmount);
                          // fetch call to add record to saved_posts collection
                          const data2add_book = {blog_id: blog_id, author_id: localStorage.getItem("_id")}
                          fetch(`${base_url}/alter-saved_posts/add`, {
                            method: "POST",
                            body: JSON.stringify(data2add_book),
                            headers: {
                              "content-type" : "application/json",
                              "x-auth-token": localStorage.getItem("token")
                            }
                          }).then(()=>console.log(data2add_book))
                        }}
                      >
                          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <BookmarkAddIcon style={{color: "green", fontSize: "30px"}} />
                            <p style={{margin: "0px", fontSize: "15px", color: "black"}}>Add to saved post</p>
                          </div>
                      </IconButton>}
                  </p>
                  <p className="icon3">
                      {trackcomment ?
                      <IconButton onClick={()=>setTrackcomment(!trackcomment)} > 
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                          <CommentsDisabledIcon style={{color: "black", fontSize: "30px"}} />
                          <p style={{margin: "0px", fontSize: "15px", color: "black"}}>Hide comments</p>
                        </div>
                      </IconButton>
                      :
                      <IconButton onClick={()=>setTrackcomment(!trackcomment)}> 
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}} >
                          <InsertCommentIcon style={{color: "green", fontSize: "30px"}} />
                          <p style={{margin: "0px", fontSize: "15px", color: "black"}}>Show comments</p>
                        </div>
                      </IconButton>}
                  </p>
              </div> 
              :
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p className="icon1"
                  onClick={handleClickOpen}
                  style={{display: "flex", alignItems: "center", gap: "8px", cursor : "pointer"}}>
                  <div style={{display: "flex", flexDirection: "column"}}><ThumbUpIcon /> Like</div> {count}
                </p>
                <p className="icon1"
                  onClick={handleClickOpen}
                  style={{display: "flex", flexDirection: "column", alignItems: "center", cursor : "pointer"}}>
                  <BookmarkAddIcon /> Add to saved post
                </p>
                <p className="icon1"
                  onClick={handleClickOpen}
                  style={{display: "flex", flexDirection: "column", alignItems: "center", cursor : "pointer"}}>
                  <InsertCommentIcon />
                  Comment
                </p>
                <Dialog
                  open={open}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle style={{textAlign: "center"}}>{"Hello from MyTavelCompanion"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      <h3 style={{textAlign: "center"}}>Please login to get access to all the feature</h3>
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
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions style={{display: "flex", justifyContent: "space-around"}}>
                    <Button variant="contained" onClick={()=> navigate("/login")}>Sign-in</Button >
                    <Button variant="contained" onClick={handleClose}>I will sign-in later</Button >
                  </DialogActions>
                </Dialog>
              </div>
            }
            <div className="commentrow">
                {trackcomment ? <Commentsparent obj={obj} comments={comments} setComments={setComments} logged_userinfo={logged_userinfo}  /> : null}
            </div>
            <hr />
            <div className="keepreadingrow">
                {/* make the fetch call to DB to display any 3 blogs randomly. Go for different design just to show the versatility */}
                <h2>Keep exploring more from MyTravelCompanion</h2>
                {keepreadingdata ? keepreadingdata.map((ele,index) => <Blogs obj={ele} key={index} />) : "Loading...."}
                <Link  style={{marginLeft: "50%", textDecoration: "none", color: "black"}} to="/home">View more</Link>
            </div>
        </div>
        <div className="rightchild">
            {/* Fetch the data from users collection based on _id stored in local storage / use local storage & pass it to About component as props */}
            <About obj={obj} />
            <hr />
            {/* Fetch the data from blogs collection based on _id stored in local storage / use local storage & pass it to Morefromauthor component as props */}
            <Morefromauthor morefromauthor={morefromauthor} />
            <hr />
            <Homerightchild3 />
        </div>
    </div>
  )
}


// About component
export function About({obj}) {

  const navigate = useNavigate();
    
  return (
    <div>
        <h3 style={{marginBottom: "10px", marginTop: "0px"}}>About the author</h3>
        <div style={{display: "flex", alignItems: 'flex-start', gap: "15px"}}>
                <img style={{width: "150px", height: "163px", objectFit: "cover", borderRadius: "50%"}} src={obj.user_info.profile_pic} alt={obj.user_info.name} />
            <div>
                {/* Make the name as a link to direct to author specific page */}
                <h4 className="styleauthimg" title="Go to author specific page" onClick={()=>navigate(`/author-specific/${obj.user_info._id}`)} style={{margin: "0px", textAlign: "left", cursor: "pointer"}}>{obj.user_info.name}</h4>
                <p style={{marginTop: "7px", marginBottom : "4px", fontSize: "15px", textAlign: "left"}}>{obj.user_info.about}</p>
            </div>
        </div>
        <div className="aboutsocialhandles">
            {obj.user_info.fb_link !=="" ? <a href={obj.user_info.fb_link} target="_blank">
                <FacebookIcon />
            </a> : null}
            {obj.user_info.twitter_link!=="" ? <a href={obj.user_info.twitter_link} target="_blank">
                <TwitterIcon />
            </a> : null}
            {obj.user_info.insta_link!== "" ? <a href={obj.user_info.insta_link} target="_blank">
                <InstagramIcon />
            </a> : null}
        </div>
        
    </div>
  )
}


// More from Author componenet
export function Morefromauthor({morefromauthor}){

    return(
        <div>
            <h3>More from the author</h3>
            {/* Any 2 different blogs other than currently opened blogs by author & loop it out calling Morefromauthorindividual  */}
            {morefromauthor[0] ? morefromauthor.map((ele, index) => <Morefromauthorindividual obj={ele} key={index} />) : <h5 style={{textAlign: "center"}}>No more blogs by author</h5>}
            {/* Link it to author specific page */}
            {/* didnt do it coz it is possible that user has only 1 article in which case it is not haviing data to navigate to author specific component */}
            {/* <div style={{marginTop: "15px"}}>
              <p onClick={()=>navigate(`/author-specific/${morefromauthor[0].}`)} style={{textAlign: "center", cursor: "pointer"}}>view all about user</p>
            </div> */}
        </div>
    )
}


// More from Author sub Component
export function Morefromauthorindividual({obj}){

  const navigate = useNavigate();

    return(
        <div className="moreauthstyle" style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: '8px'}}>
            <h4 onClick={()=> navigate(`/open-a-blog/${obj._id}`)} style={{marginTop: "0px", cursor: "pointer"}}>{obj.title}</h4>
            <img style={{width: "35px", height: "35px", objectFit: "cover"}} src={obj.blog_pic} alt={obj.title} />
        </div>
    )
}



// Comments parent
export function Commentsparent({obj, comments, setComments, logged_userinfo}) {

    const commentform = yup.object({
        actual_comment: yup.string().required()
    })

    const formik= useFormik({
        initialValues : {actual_comment: ""},
        validationSchema: commentform,
        onSubmit: (values) => {
            let data_to_put = {...values, blog_id: obj._id, author_id: localStorage.getItem("_id") };
            console.log(data_to_put);
            fetch(`${base_url}/post-comment`, {
              method: "POST",
              body: JSON.stringify(data_to_put),
              headers: {
                "content-type" : "application/json",
                "x-auth-token": localStorage.getItem("token")
              }
            }).then((data) => data.json()).then((data) => {setComments(data); formik.resetForm(); toast.success("comment  successfully added")})
        }
    })

  return (
    <div style={{backgroundColor: "#958c3a", padding: "10px"}}>
        <h3>Comments  ({comments.length})</h3>
        <p style={{textAlign: "left"}}>Comment down your thoughts</p>
        <form onSubmit={formik.handleSubmit} style={{display: "flex", alignItems: "center", gap: "5px",marginBottom: "13px"}}>
            {/* Update / fetch the image and name using the localstorage data & create the object using formik by adding the profile pic link & name   orrrrrr  else just give user_id if you figured it out */}
            <img style={{borderRadius: "50%", height: "40px", width: "40px", objectFit: "cover"}} src={logged_userinfo.profile_pic} alt={logged_userinfo.name} />
            <div>
                <h4 style={{margin: "0px", textAlign: "left"}}>{logged_userinfo.name}</h4>
                <input 
                    name="actual_comment" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    type="text" 
                    value={formik.values.actual_comment}
                    placeholder="Your comment here......" 
                    size={90}
                />
                {formik.touched.comment && formik.errors.comment ? <p style={{color: "red", margin: "2px"}}>{formik.errors.comment}</p> : null}
            </div>
            <button style={{padding: "10px"}} type="submit">Post</button>
        </form>
        {comments[0] ? comments.map((ele,index)=> <Comments obj={ele} key={index} />) : "No comments yet"}
    </div>
  )
}


// Comments parent sub component
export function Comments({obj}) {

  return (
    <div style={{display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px"}}>
        <img style={{borderRadius: "50%", height: "40px", width: "40px", objectFit: "cover"}} src={obj.user_info.profile_pic} alt={obj.user_info.name} />
        <div>
            <h4 style={{margin: "0px", textAlign: "left"}}>{obj.user_info.name}</h4>
            <p style={{margin: "0px", fontSize: "15px"}}>{obj.actual_comment}</p>
        </div>
    </div>
  )
}
