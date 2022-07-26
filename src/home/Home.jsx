import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams} from "react-router-dom";
import "./Home.css";
import { Nav } from '../nav/Nav.jsx';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useFormik } from 'formik';


const base_url = "http://localhost:5000"

export function Home() {

    const[blogs, setBlogs] = useState(null);

    // showing specific heading upon click
    const[mountain, setMountain] = useState(false);
    const[hill_station, setHill_station] = useState(false);
    const[adventure, setAdventure] = useState(false);
    const[search, setSearch] = useState(false);
    const[normalheading, setNormalheading] = useState(true);

    useEffect(() => {
      fetch(`${base_url}/home`).then((data)=>data.json()).then((data)=> setBlogs(data))
    }, [])



  return (
    <div>
        <Nav />
        <div style={{display: "flex"}}>
            <div className="homeleftchild">
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        {adventure ? <h2>Showing results for adventure</h2> : null}
                        {hill_station ? <h2>Showing results for hill station</h2> : null}
                        {mountain ? <h2 >Showing results for mountain</h2> : null}
                        {search ? <h2>Showing search results</h2> : null}
                        {normalheading ? <h2>Explore Blogs</h2> : null}
                        {normalheading ? <p>Discover from the community</p> : null}
                    </div>
                    {/* solve it later --- reset button visisbilty to fall back to initial conditions */}
                    {/* <div>
                        {normalheading === false ? <button onClick={
                            fetch(`${base_url}/home`).then((data)=>data.json()).then((data)=> {setBlogs(data);
                                setMountain(false);
                                setHill_station(false);
                                setAdventure(false);
                                setSearch(false);
                                setNormalheading(true);
                            })
                        }>Reset</button> : null}
                    </div> */}
                </div>
                <hr />
                {blogs ? blogs.map((ele)=> <Blogs obj={ele} key={ele._id} />) : "Loading.."}
            </div>
            <div className="homerightchild" style={{width: "350px", marginTop:"90px", borderLeft: "1px dotted grey"}}>
                <Homerightchild1 setBlogs={setBlogs} setSearch={setSearch} setMountain={setMountain} setHill_station={setHill_station} setAdventure={setAdventure} setNormalheading={setNormalheading} />
                <hr />
                <Homerightchild2 setBlogs={setBlogs} setSearch={setSearch} setMountain={setMountain} setHill_station={setHill_station} setAdventure={setAdventure} setNormalheading={setNormalheading} />
                <hr />
                <Homerightchild3 />
            </div>
        </div>
    </div>
  )
}


// Search Component  -- right child 1
export function Homerightchild1({setBlogs, setMountain, setHill_station, setAdventure, setSearch, setNormalheading}) {

    const formik = useFormik({
        initialValues : {search : ""},
        onSubmit: (values)=> {
            console.log(values);
            if(values.search===""){
                fetch(`${base_url}/home`).then((data)=>data.json()).then((data)=> {setBlogs(data);
                    setMountain(false);
                    setHill_station(false);
                    setAdventure(false);
                    setSearch(false);
                    setNormalheading(true);
                })
            }else{
                fetch(`${base_url}/search?title=${values.search}`).then((data)=>data.json()).then((data)=> {
                    setBlogs(data);
                    setMountain(false);
                    setHill_station(false);
                    setAdventure(false);
                    setSearch(true);
                    setNormalheading(false);
                
                })
            }
        }
    })

    return (

      <div>
        <h3>Search by Title</h3>
          <form onSubmit={formik.handleSubmit}>
              <input style={{borderRadius: "10px", padding: "5px"}} placeholder="search here" name='search' onChange={formik.handleChange} type="text" />
              <button style={{borderRadius: "10px", padding: "5px"}} type='submit'>Search</button>
          </form>
      </div>
    )
}

// Discover by tags component  -- right child 2
export function Homerightchild2({setBlogs, setMountain, setHill_station, setAdventure, setSearch, setNormalheading}) {


  return (
    <div>
        <h3 style={{display:"flex", alignItems: "center",  marginTop: "30px"}}>Discover by tags <i class="fa-solid fa-tags" /></h3>
        <p>Explore more of what matters to you</p>
        <div className="tagcontainer">
            <button onClick={()=> {
                fetch(`${base_url}/tag?tag=mountain`).then((data)=>data.json()).then((data)=> {setBlogs(data); 
                    setMountain(true);
                    setHill_station(false);
                    setAdventure(false);
                    setSearch(false);
                    setNormalheading(false);
                })
            }}>mountain</button>
            <button onClick={()=>{
                fetch(`${base_url}/tag?tag=hill station`).then((data)=>data.json()).then((data)=> {setBlogs(data);
                    setMountain(false);
                    setHill_station(true);
                    setAdventure(false);
                    setSearch(false);
                    setNormalheading(false);
                })
            }}>hill station</button>
            <button onClick={()=>{
                fetch(`${base_url}/tag?tag=adventure`).then((data)=>data.json()).then((data)=> {setBlogs(data);
                    setMountain(false);
                    setHill_station(false);
                    setAdventure(true);
                    setSearch(false);
                    setNormalheading(false);
                })
            }}>adventure</button>
        </div>
    </div>
  )
}

// Quick Links component   -- right child 3
export function Homerightchild3() {
    // update the to attribute to point to right direction
  return (
    <div style={{display:"flex", justifyContent: "space-between", marginTop: "30px"}}>
        <Link style={{textDecoration: "none", color: "grey", fontSize: "14px"}} to="">About</Link>
        <Link style={{textDecoration: "none", color: "grey", fontSize: "14px"}} to="">Reach to us</Link>
        <Link style={{textDecoration: "none", color: "grey", fontSize: "14px"}} to="">Social media handles</Link>
    </div>
  )
}



// Blogs component
export function Blogs({obj}) {

    const navigate = useNavigate();

    let short_des = obj.story;
    short_des = short_des.slice(0,10)

    return(
        <div className='parenttonormal'>
            <div className="normalcomponent">
                <div className="normalcomponentleftchild">
                    <div className="topcol">
                        <img className='authorimage' src={obj.user_info.profile_pic} alt={obj.user_info.name} />
                        <p className='authorname'>{obj.user_info.name}</p>
                        <p style={{display:"flex", alignItems: "center"}} className='date'><CalendarMonthIcon /> {obj.date}</p>
                    </div>
                    <div className="midcol">
                        {/* Update the navigate link as you proceed */}
                        <h3 onClick={()=> navigate(`/open-a-blog/${obj._id}`)}>{obj.title}</h3>
                        <p onClick={()=> navigate(`/open-a-blog/${obj._id}`)}>{short_des}.....</p>
                    </div>
                    <div className="botcol">
                        <p style={{display:"flex", alignItems: "center"}}><i class="fa-solid fa-tags" />  {obj.tag}</p>
                        <p style={{display:"flex", alignItems: "center"}}><AccessTimeIcon /> {obj.time_to_read + " min read"}</p>
                        {/* <p style={{display:"flex", alignItems: "center"}}><BookmarkAddOutlinedIcon /> save post </p> */}
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







// Dummy data for initial stages
let arr =[
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 1",
        "story": "This is story 1",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "mountain",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 2",
        "story": "This is story 2",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "mountain",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 3",
        "story": "This is story 3",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "mountain",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 4",
        "story": "This is story 4",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "mountain",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 5",
        "story": "This is story 5",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "mountain",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 6",
        "story": "This is story 6",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "mountain",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 7",
        "story": "This is story 7",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "mountain",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 8",
        "story": "This is story 8",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "hill station",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 9",
        "story": "This is story 9",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "hill station",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 10",
        "story": "This is story 10",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "hill station",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 11",
        "story": "This is story 11",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "hill station",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 12",
        "story": "This is story 12",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "hill station",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 13",
        "story": "This is story 13",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "hill station",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 14",
        "story": "This is story 14",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "hill station",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 15",
        "story": "This is story 15",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "adventure",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 16",
        "story": "This is story 16",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "adventure",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 17",
        "story": "This is story 17",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "adventure",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 18",
        "story": "This is story 18",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "adventure",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 19",
        "story": "This is story 19",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "adventure",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    },
    {
        "date": "21 July",
        "time_to_read": 5,
        "Author": "abcdefgh",
        "title": "This is title 20",
        "story": "This is story 20",
        "blog_pic": "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "tag": "adventure",
        "profile_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg",
        "clap" : 20,
        "comments": [
            {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
             {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
              {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"},
               {"comment" : "This is a good article", "c_name": "random user", "c_pic": "https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg"}
        ]
    }
]
