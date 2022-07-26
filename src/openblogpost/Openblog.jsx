import "./Openblog.css"
import { Nav } from '../nav/Nav.jsx';
import { Homerightchild3 } from "../home/Home";
import { Blogs } from "../home/Home";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import Button from '@mui/material/Button'
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



const base_url = "http://localhost:5000"

export function Openblog() {

  const {id} = useParams();

  const user_uid = "62ddd684103fbc2cfb7c09a3"     // instead of hardcoding the data use local storage info of logged in user

  const[specific_blog, setSpecific_blog] = useState(null);
  const[comments, setComments] = useState(null);
  const[logged_userinfo, setLogged_userinfo] = useState("");
  const[likeonmount, setLikeonmount] = useState(null);            // render like accordingly on mount 
  const[bookmarkonmount, setBookmarkonmount] = useState(null);    // render bookmark accordingly on mount 
  const[keepreadingdata, setKeepreadingdata] = useState([]);      // Keep reading data on mount
  const[morefromauthor, setMorefromauthor] = useState([]);        // more from author data on mount

  useEffect(() => {
    // using req.params in the backend 
    fetch(`${base_url}/open-a-blog/${id}`).then((data)=>data.json()).then((data)=>{setSpecific_blog(data); console.log(data);});
    fetch(`${base_url}/comments/${id}`).then((data)=>data.json()).then((data)=>{setComments(data); console.log(data);});
    // the user ObjectId params to backend should be passed from the localstorage only if the user is logged in
    // as of now i have passed the static data of users ObjectId
    fetch(`${base_url}/individual-user-info/${user_uid}`).then((data)=>data.json()).then((data)=>{setLogged_userinfo(data); console.log(data);});
    // fetch call to render the like icon accordingly when the component first mounts
    let data2send= {"blog_id": id,"author_id": user_uid}
    fetch(`${base_url}/get-like-info`, {
      method: "POST",
      body : JSON.stringify(data2send),
      headers: {
        "content-type": "application/json"
      }
    }).then((data)=>data.json()).then((data)=>{setLikeonmount(data.msg);console.log(likeonmount,data);})
    // fetch call to render the bookmark icon accordingly when the component first mounts
    let data2send1= {"blog_id": id,"author_id": user_uid}
    fetch(`${base_url}/get-bookmark-info`, {
      method: "POST",
      body : JSON.stringify(data2send1),
      headers: {
        "content-type": "application/json"
      }
    }).then((data)=>data.json()).then((data)=>{setBookmarkonmount(data.msg);console.log(bookmarkonmount,data);})
    // fetch call for keepreading data i.e.. the bottom-most component & return any 2 blogs & sotre it in keepreadingdata variable from useSate
    fetch(`${base_url}/keep-reading`).then((data)=>data.json()).then((data)=>setKeepreadingdata(data))
    // fetch call for morefromauthor data i.e.. the right-most component & return any 2 blogs & sotre it in morefromauthor variable from useSate
    fetch(`${base_url}/more-from-author/${id}`).then((data)=>data.json()).then((data)=>{setMorefromauthor(data); console.log("identifier",data);})
  }, [])
  

  return (
    <div>
        <Nav />
        <div>
            {specific_blog ? <Blogcomponent obj={specific_blog} comments={comments} setComments={setComments} logged_userinfo={logged_userinfo} likeonmount={likeonmount} setLikeonmount={setLikeonmount} blog_id={id} author_id={user_uid} bookmarkonmount={bookmarkonmount} setBookmarkonmount={setBookmarkonmount} keepreadingdata={keepreadingdata} morefromauthor={morefromauthor} /> : null}
        </div>
    </div>
  )
}




export function Blogcomponent({obj, comments, setComments, logged_userinfo, likeonmount, setLikeonmount, blog_id, author_id, bookmarkonmount, setBookmarkonmount, keepreadingdata, morefromauthor}) {

    // let obj = {
    //     "_id": {
    //       "$oid": "62db2ecacc2f07deff68d6ae"
    //     },
    //     "date": "21 July",
    //     "time_to_read": 5,
    //     "Author": "abcdefgh",
    //     "title": "This is title 1",
    //     "story": "This is story 1",
    //     "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //     "tag": "mountain",
    //     "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
    //     "clap": 20,
    //     "comments": [
    //       {
    //         "comment": "This is a good article",
    //         "c_name": "random user",
    //         "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //       },
    //       {
    //         "comment": "This is a good article",
    //         "c_name": "random user",
    //         "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //       },
    //       {
    //         "comment": "This is a good article",
    //         "c_name": "random user",
    //         "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //       },
    //       {
    //         "comment": "This is a good article",
    //         "c_name": "random user",
    //         "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //       }
    //     ]
    // }

    // let arr = [
    //     {
    //         "_id": {
    //           "$oid": "62db2ecacc2f07deff68d6ae"
    //         },
    //         "date": "21 July",
    //         "time_to_read": 5,
    //         "Author": "abcdefgh",
    //         "title": "This is title 1",
    //         "story": "This is story 1",
    //         "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //         "tag": "mountain",
    //         "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
    //         "clap": 20,
    //         "comments": [
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           },
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           },
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           },
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           }
    //         ]
    //     },
    //     {
    //         "_id": {
    //           "$oid": "62db2ecacc2f07deff68d6ae"
    //         },
    //         "date": "21 July",
    //         "time_to_read": 5,
    //         "Author": "abcdefgh",
    //         "title": "This is title 1",
    //         "story": "This is story 1",
    //         "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    //         "tag": "mountain",
    //         "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
    //         "clap": 20,
    //         "comments": [
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           },
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           },
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           },
    //           {
    //             "comment": "This is a good article",
    //             "c_name": "random user",
    //             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    //           }
    //         ]
    //     }
    // ]

    // const[trackclap, setTrackclap] = useState(likeonmount);         // to render the like icons accordingly after the component mounts               {{{{{{{{{{del after like is working as expected}}}}}}}}}}
    
    const[count, setCount] = useState(obj.clap);

    // const[trackbookmark, setTrackbookmark] = useState(false);         // {{{{{{{del after everything is working as expected}}}}}}}

    const[trackcomment, setTrackcomment] = useState(false);                  // to show / hide comments

    // const[actualcomments, setActualcomments] = useState(obj.comments);      {{{{{{{{{{del after comment is set to working}}}}}}}}}}

    

  return (
    <div style={{display: "flex"}}>
        <div className="indi_blog leftchild">
            <div className="toprow">
                    <p style={{display:"flex", alignItems: "center"}}><img className='authorimage' src={obj.user_info.profile_pic} alt={obj.name} />{obj.user_info.name}</p>
                    <p style={{display:"flex", alignItems: "center"}} className='date'><CalendarMonthIcon /> {obj.date}</p>
                    <p style={{display:"flex", alignItems: "center"}}><AccessTimeIcon /> {obj.time_to_read + " min read"}</p>
                    <p style={{display:"flex", alignItems: "center"}}><i class="fa-solid fa-tags" />  {obj.tag}</p>
            </div>
            <hr />
            <div className="midrow">
                <h2>{obj.title}</h2>
                <img src={obj.blog_pic} alt={obj.title} />
                <p>{obj.story}</p>
            </div>
            <div className="lastrow" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>
                    {likeonmount ?
                    <IconButton 
                      onClick={()=>{
                        setLikeonmount(!likeonmount);
                        setCount(count-1);
                        // fetch call to decrement the like      --- the backend need not to return anything & use setCount to store updated like count only in locally
                        const data2send= {clap : count-1}
                        fetch(`${base_url}/alter-clap-count/${blog_id}`, {
                          method: "POST",
                          body: JSON.stringify(data2send),
                          headers: {
                            "content-type" : "application/json"
                          }
                        }).then(()=>console.log(data2send))
                        // fetch call to remove record to liked_posts collection     --- backend returns nothing
                        const data2remove = {blog_id: blog_id ,author_id: author_id}
                        fetch(`${base_url}/alter-liked_posts/remove`, {
                          method: "POST",
                          body: JSON.stringify(data2remove),
                          headers: {
                            "content-type" : "application/json"
                          }
                        }).then(()=>console.log("data2remove", data2remove))
                      }}
                    >
                        <ThumbDownIcon />
                    </IconButton>
                    :
                    <IconButton 
                      onClick={()=>{
                        setLikeonmount(!likeonmount);
                        setCount(count+1);
                        // fetch call to decrement the like      --- the backend need not to return anything & use setCount to store updated like count only in locally
                        const data2send= {clap : count+1}
                        fetch(`${base_url}/alter-clap-count/${blog_id}`, {
                          method: "POST",
                          body: JSON.stringify(data2send),
                          headers: {
                            "content-type" : "application/json"
                          }
                        }).then(()=>console.log(data2send))
                        // fetch call to add record to liked_posts collection     --- backend returns nothing
                        const data2put = {blog_id: blog_id ,author_id: author_id}
                        fetch(`${base_url}/alter-liked_posts/add`, {
                          method: "POST",
                          body: JSON.stringify(data2put),
                          headers: {
                            "content-type" : "application/json"
                          }
                        }).then(()=>console.log("data2put", data2put))
                      }}
                    >
                        <ThumbUpIcon />
                    </IconButton>}
                    {count}
                </p>
                <p>
                    {bookmarkonmount ?
                    <IconButton 
                      onClick={()=>{
                        setBookmarkonmount(!bookmarkonmount);
                        // fetch call to remove record from saved_posts collection
                        const data2remove_book = {blog_id: blog_id, author_id: author_id}
                        fetch(`${base_url}/alter-saved_posts/remove`, {
                          method: "POST",
                          body: JSON.stringify(data2remove_book),
                          headers: {
                            "content-type" : "application/json"
                          }
                        }).then(()=>console.log(data2remove_book))
                      }}
                    >
                        <BookmarkRemoveIcon />
                    </IconButton>
                    :
                    <IconButton 
                      onClick={()=>{
                        setBookmarkonmount(!bookmarkonmount);
                        // fetch call to add record to saved_posts collection
                        const data2add_book = {blog_id: blog_id, author_id: author_id}
                        fetch(`${base_url}/alter-saved_posts/add`, {
                          method: "POST",
                          body: JSON.stringify(data2add_book),
                          headers: {
                            "content-type" : "application/json"
                          }
                        }).then(()=>console.log(data2add_book))
                      }}
                    >
                        <BookmarkAddIcon />
                    </IconButton>}
                </p>
                <p>
                    {trackcomment ?
                    <Button onClick={()=>setTrackcomment(!trackcomment)} variant="outlined" startIcon={<CommentsDisabledIcon />}>
                    Hide Comments
                    </Button>
                    :
                    <Button onClick={()=>setTrackcomment(!trackcomment)} variant="outlined" startIcon={<InsertCommentIcon />}>
                        Show Comments
                    </Button>}
                </p>
            </div>
            <div className="commentrow">
                {trackcomment ? <Commentsparent obj={obj} comments={comments} setComments={setComments} logged_userinfo={logged_userinfo}  /> : null}
            </div>
            <hr />
            <div className="keepreadingrow">
                {/* make the fetch call to DB to display any 3 blogs randomly. Go for different design just to show the versatility */}
                <h3>Keep reading</h3>
                <p>More from MyTravelComapanion</p>
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



export function About({obj}) {
    // const obj={
    //     profile_pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4mZWAZ6H7rMwse_xz7xZCX6a4blTjTD_eSQ&usqp=CAU",
    //     name: "Kathy",
    //     about: "I’m a writer & travel addict originally from Uttrakhand. I have been traveling independently around India. I set up this blog to share my tips and experiences for traveling to inspire and help you to travel more too.",
    //     fb_link : "fbhdfjkhbfd",
    //     twitter_link : "sgjklkfbj;ldf",
    //     insta_link: "kxfcvjlkxfjlfk"
    // }          {{{{{{{{{{{delete after everything is working fine}}}}}}}}}}}
  return (
    <div>
        <h3 style={{marginBottom: "10px", marginTop: "0px"}}>About the author</h3>
        <div style={{display: "flex", alignItems: 'flex-start', gap: "15px"}}>
                <img style={{width: "150px", height: "163px", objectFit: "cover", borderRadius: "50%"}} src={obj.user_info.profile_pic} alt={obj.user_info.name} />
            <div>
                {/* Make the name as a link to direct to author specific page */}
                <Link style={{textDecoration: "none", color: "black"}} to=""><h4 style={{margin: "0px"}}>{obj.user_info.name}</h4></Link>
                <p style={{marginTop: "7px", marginBottom : "4px", fontSize: "15px"}}>{obj.user_info.about}</p>
            </div>
        </div>
        <div className="aboutsocialhandles">
            <a href={obj.user_info.fb_link} target="_blank">
                <FacebookIcon />
            </a>
            <a href={obj.user_info.twitter_link} target="_blank">
                <TwitterIcon />
            </a>
            <a href={obj.user_info.insta_link} target="_blank">
                <InstagramIcon />
            </a>
        </div>
        
    </div>
  )
}

export function Morefromauthor({morefromauthor}){

//     let arr = [
//     {
//         "_id": {
//           "$oid": "62db2ecacc2f07deff68d6ae"
//         },
//         "date": "21 July",
//         "time_to_read": 5,
//         "Author": "abcdefgh",
//         "title": "This is title 1",
//         "story": "This is story 1",
//         "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         "tag": "mountain",
//         "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
//         "clap": 20,
//         "comments": [
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           },
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           },
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           },
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           }
//         ]
//     },
//     {
//         "_id": {
//           "$oid": "62db2ecacc2f07deff68d6ae"
//         },
//         "date": "21 July",
//         "time_to_read": 5,
//         "Author": "abcdefgh",
//         "title": "This is title 1",
//         "story": "This is story 1",
//         "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//         "tag": "mountain",
//         "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
//         "clap": 20,
//         "comments": [
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           },
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           },
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           },
//           {
//             "comment": "This is a good article",
//             "c_name": "random user",
//             "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
//           }
//         ]
//     }
// ]

    return(
        <div>
            <h3>More from the author</h3>
            {/* take any 3 blogs from props and then randomly choose any 2 & loop it out calling Morefromauthorindividual  */}
            {morefromauthor.map((ele, index) => <Morefromauthorindividual obj={ele} key={index} />)}
            {/* Link it to author specific page */}
            <Link to="" style={{marginLeft: "50%", textDecoration: "none", color: "black"}}>view more</Link>
        </div>
    )
}

export function Morefromauthorindividual({obj}){
    return(
        <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: '8px'}}>
            {/* link it to open the specific post */}
            <Link style={{textDecoration: "none", color: 'black'}} to=""><h4 style={{marginTop: "0px"}}>{obj.title}</h4></Link>
            <img style={{width: "35px", height: "35px", objectFit: "cover"}} src={obj.blog_pic} alt={obj.title} />
        </div>
    )
}




export function Commentsparent({obj, comments, setComments, logged_userinfo}) {
    // const obj = {
    //     "comment": "This is a good article",
    //     "c_name": "random user",
    //     "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    // }         {{{{{{{{{ del after checking everything  }}}}}}}}}

    const[commentslength, setCommentslength] = useState(comments.length)

    const commentform = yup.object({
        actual_comment: yup.string().required()
    })

    const formik= useFormik({
        initialValues : {actual_comment: ""},
        validationSchema: commentform,
        onSubmit: (values) => {
            let data_to_put = {...values, blog_id: obj._id, author_id: logged_userinfo._id };
            console.log(data_to_put);
            fetch(`${base_url}/post-comment`, {
              method: "POST",
              body: JSON.stringify(data_to_put),
              headers: {
                "content-type" : "application/json"
              }
            }).then((data) => data.json()).then((data) => {setComments(data);})
        }
    })

  return (
    <div style={{backgroundColor: "grey", padding: "10px"}}>
        <h3>Comments  ({commentslength})</h3>
        <p>Comment down your thoughts</p>
        <form onSubmit={formik.handleSubmit} style={{display: "flex", alignItems: "center", gap: "5px",marginBottom: "13px"}}>
            {/* Update / fetch the image and name using the localstorage data & create the object using formik by adding the profile pic link & name   orrrrrr  else just give user_id if you figured it out */}
            <img style={{borderRadius: "50%", height: "40px", width: "40px", objectFit: "cover"}} src={logged_userinfo.profile_pic} alt={logged_userinfo.name} />
            <div>
                <h4 style={{margin: "0px"}}>{logged_userinfo.name}</h4>
                <input 
                    name="actual_comment" 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    type="text" 
                    value={formik.values.comment}
                    placeholder="Your comment here......" 
                    size={90}
                />
                {formik.touched.comment && formik.errors.comment ? <p style={{color: "red", margin: "2px"}}>{formik.errors.comment}</p> : null}
            </div>
            <button style={{padding: "10px"}} type="submit">Post</button>
        </form>
        {comments.map((ele,index)=> <Comments obj={ele} key={index} /> )}
    </div>
  )
}


export function Comments({obj}) {

    // const obj = {
    //     "comment": "This is a good article",
    //     "c_name": "random user",
    //     "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"
    // }          {{{{{{{{{delete after checking everything}}}}}}}}}

  return (
    <div style={{display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px"}}>
        <img style={{borderRadius: "50%", height: "40px", width: "40px", objectFit: "cover"}} src={obj.user_info.profile_pic} alt={obj.user_info.name} />
        <div>
            <h4 style={{margin: "0px"}}>{obj.user_info.name}</h4>
            <p style={{margin: "0px", fontSize: "15px"}}>{obj.actual_comment}</p>
        </div>
    </div>
  )
}
