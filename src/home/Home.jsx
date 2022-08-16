import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { Nav } from '../nav/Nav.jsx';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
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
                        {adventure ? <h3>Showing results for adventure</h3> : null}
                        {hill_station ? <h3>Showing results for hill station</h3> : null}
                        {mountain ? <h3 >Showing results for mountain</h3> : null}
                        {search ? <h3>Showing search results</h3> : null}
                        {normalheading ? <h3>Explore Blogs from the community</h3> : null}
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
            <div className="homerightchild" style={{width: "350px", marginTop:"50px", borderLeft: "1px dotted grey"}}>
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
          <form onSubmit={formik.handleSubmit} style={{display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap"}}>
              <input style={{borderRadius: "10px", padding: "8px"}} placeholder="search here" name='search' onChange={formik.handleChange} type="text" value={formik.values.search} size="35" />
              <button style={{borderRadius: "10px", padding: "8px", cursor: "pointer", backgroundColor: "green", color: "white"}} type='submit'>Search</button>
              <button style={{borderRadius: "10px", padding: "8px", cursor: "pointer", backgroundColor: "#958c3a", color: "white"}} type='submit' onClick={formik.resetForm}>Reset results</button>
          </form>
      </div>
    )
}

// Discover by tags component  -- right child 2
export function Homerightchild2({setBlogs, setMountain, setHill_station, setAdventure, setSearch, setNormalheading}) {


  return (
    <div>
        <h3 style={{display:"flex", alignItems: "center",  marginTop: "30px", gap: "8px"}}>Discover by tags <i className="fa-solid fa-tags" /></h3>
        <p style={{textAlign: "left"}}>Explore more of what matters to you</p>
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
        <Link style={{textDecoration: "none", color: "grey", fontSize: "14px"}} to="/">About</Link>
        <Link style={{textDecoration: "none", color: "grey", fontSize: "14px"}} to="/">Reach to us</Link>
        <Link style={{textDecoration: "none", color: "grey", fontSize: "14px"}} to="/">Social media handles</Link>
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
                        <div title='Go to author specific page' onClick={()=>navigate(`/author-specific/${obj.user_info._id}`)} style={{display: "flex", gap: "8px", alignItems: "center", cursor: "pointer"}}>
                            <img className='authorimage' src={obj.user_info.profile_pic} alt={obj.user_info.name} />
                            <p style={{margin: "0px"}} className='authorname'>{obj.user_info.name}</p>
                        </div>
                        <p style={{display:"flex", alignItems: "center", gap: "8px",margin: "0px"}} className='date'><CalendarMonthIcon /> {obj.date}</p>
                        <p style={{display:"flex", alignItems: "center", gap: "8px", margin: "0px"}} className='date'><i className="fa-solid fa-tags" />  {obj.tag}</p>
                        <p style={{display:"flex", alignItems: "center", gap: "8px", margin: "0px"}} className='date'><AccessTimeIcon /> {obj.time_to_read + " min read"}</p>
                    </div>
                    <div className="midcol">
                        {/* Update the navigate link as you proceed */}
                        <h3 style={{marginTop: "15px"}} onClick={()=> navigate(`/open-a-blog/${obj._id}`)}>{obj.title}</h3>
                        <p onClick={()=> navigate(`/open-a-blog/${obj._id}`)}>{short_des}.....</p>
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


