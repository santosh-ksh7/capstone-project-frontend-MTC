import "./Authorspecific.css";
import {Nav} from "../nav/Nav";
import {Homerightchild3} from "../home/Home"
import { Blogs } from "../home/Home";
import { useParams, Link, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';


const base_url = "http://localhost:5000"


export function Authorspecific() {

    // Grab the author id from the URL
    const{id} = useParams();

    const[authordet, setAuthordet] = useState(null);
    const[allblogs, setAllblogs] = useState(null);
    const[keepexpmtc, setkeepexpmtc] = useState(null);


    // useEffect to get info about the author, get all blogs by the author, get keep exploring MyTravelCompanion data 
    useEffect(()=>{
        // get info about the author
        fetch(`${base_url}/sign/get-author-info/${id}`).then((data)=>data.json()).then((data)=>setAuthordet(data));
        // get all blogs by the user
        fetch(`${base_url}/sign/get-all-blogs/${id}`).then((data)=>data.json()).then((data)=>setAllblogs(data));
        // get keep exploring MTC data
        fetch(`${base_url}/get-any-4-random-blogs`).then((data)=>data.json()).then((data)=>setkeepexpmtc(data));
    }, [])

  return (
    <div>
        <Nav />
        <div className="maincccc">
            <div className="leftchildauthorspecific">
                <div className="lc1about">
                    <h2>About the author</h2>
                    <hr />
                    {authordet ? <Lcaboutauthor obj={authordet} /> : "Loading....."}
                    <hr />
                    {/* instaed of user give the name */}
                    <h2>All the blogs by user</h2>
                    <hr />
                    {allblogs ? allblogs.map((ele,index)=> <Blogs obj={ele} key={index} />) : "Loadng..."}
                </div>
                <div className="lc2allblogsbyauthor"></div>
            </div>
            <div className="rightchildauthorspecific">
                <h3>Keep exploring MyTravelCompanion</h3>
                {keepexpmtc ? keepexpmtc.map((ele,index)=> <Rckeepexpmtc obj={ele} key={index} />) : "Loading...."}
                <Link style={{textDecoration: "none", marginLeft: "40%"}} to="/home">View more</Link>
                <hr />
                <Homerightchild3 />
            </div>
        </div>
    </div>
  )
}






export function Lcaboutauthor({obj}) {
  return (
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






export function Rckeepexpmtc({obj}) {

    const navigate = useNavigate();

  return (
    <div>
        <h4 onClick={()=>navigate(`/open-a-blog/${obj._id}`)} style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", cursor: "pointer"}} >{obj.title} <img style={{width: "40px", height: "40px"}} src={obj.blog_pic} alt={obj.title} /></h4>
    </div>
  )
}
