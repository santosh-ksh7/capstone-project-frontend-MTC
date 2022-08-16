import "./Updateaccount.css";
import { Nav } from '../nav/Nav.jsx';
import { Homerightchild3 } from "../home/Home";
import { Rightchild1 } from "../my-account/Myaccount";
import { useFormik } from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Ifnotloggedin } from "../if-not-logged-in/Ifnotloggedin";

// DIalog box until the upload process happens
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const base_url = "http://localhost:5000"; 


export function Updateaccount() {

    const [imgdata, setImgdata] = useState(null)                 // This holds thge entire file data
    const [userdata, setUserdata] = useState(null)              // holds entire user info stored in DB
    const [usrpic, setUsrpic] = useState(null)                  // holds user profile pic link whether local or https link for comparision logic in cloudinary & for displaying the preview.

    // function to get hold of image file when user updates his profile pic
    function fileChange(event){
        // destructure to get the first file from file list
        const[filedata] = event.target.files;
        // if-else laddder to check for the relevant file type like jpg, jpeg, png & file size should be less than 5mb
        if(filedata.type === "image/png" || filedata.type === "image/jpeg"){
            if(filedata.size <= 5000000){
                // creating image path in th elocal machine using URL.createObjectURL method
                let localpath = URL.createObjectURL(filedata);
                setImgdata(filedata);
                setUsrpic(localpath);
            }else{
                alert("The selected image file should be less than 5 mb in size")
            }
        }else{
            alert("The selected fiel type should be of image type - jpg, jpeg, png")
        }  
    }

    useEffect(() => {
        if(localStorage.getItem("_id") && localStorage.getItem("token")){
            fetch(`${base_url}/individual-user-info/${localStorage.getItem("_id")}`).then((data)=>data.json()).then((data)=>{setUserdata(data); setUsrpic(data.profile_pic); console.log(data);})
        }
    }, [])

  return (
    <div>
        {localStorage.getItem("_id") ? 
        <div>
            <Nav />
            <div style={{display: "flex"}}>
                <div className="leftchild">
                    {userdata ? <Leftchild1update obj={userdata} usrpic={usrpic} setUsrpic={setUsrpic} fileChange={fileChange} imgdata={imgdata} /> : "Loading....."}
                </div>
                <div className="rightchild">
                    <Rightchild1 />
                    <hr />
                    <Homerightchild3 />
                </div>
            </div>
        </div> : <Ifnotloggedin /> }
    </div>
  )
}




export function Leftchild1update({obj, usrpic, setUsrpic, fileChange, imgdata }) {

    // dialog-box logic from material UI
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    // dialog-box logic from material UI

    const navigate = useNavigate();


    const accountupdateschema = yup.object({
        email: yup.string().email().required(),
        name: yup.string().required(),
        about: yup.string().required().max(216)
    })

    const formik = useFormik({
        initialValues: {name: obj.name, email: obj.email, about: obj.about, fb_link: obj.fb_link, insta_link: obj.insta_link, twitter_link: obj.twitter_link},
        validationSchema: accountupdateschema,
        onSubmit: (values) => {
            handleClickOpen();
            // Make fetch call to Cloudinary only if user has upadted the image file. Do not make fetch call to cloudinary if user hasn't updated it's profile pic or removed the pic
            if(usrpic === obj.profile_pic || usrpic === "https://res.cloudinary.com/dz7pcmtxi/image/upload/v1658877142/blank-profile-picture-g3824f2029_1280_rpx6sg.png"){
                // directly insert data to DB
                let data4DB = {
                    ...values,
                    profile_pic: usrpic,
                    _id: obj._id
                }
                fetch(`${base_url}/sign/update-account-info`, {
                    method: "POST",
                    body: JSON.stringify(data4DB),
                    headers: {
                        "content-type" : "application/json"
                    }
                }).then((data)=>data.json()).then((data)=>{
                    if(data.acknowledged){
                        handleClose();
                        alert("Succesfully updated account info")
                        navigate("/my-account")
                    }else{
                        alert(data.msg)
                    }
                })
            }else{
                // if the user updates his profile pic with local image file. First make a call to cloudinary API to upload the new image & get back the url to access newly updated image which is then inserted in DB
                const data4cloudinary = new FormData();
                data4cloudinary.append("file", imgdata);
                data4cloudinary.append('upload_preset', 'mtc-uploads');
                fetch(`https://api.cloudinary.com/v1_1/dz7pcmtxi/image/upload`, {
                    method: "POST",
                    body: data4cloudinary,
                }).then((data)=>data.json()).then((data)=>{
                    let data4DB = {
                        ...values,
                        profile_pic: data.secure_url,
                        _id: obj._id
                    }
                    fetch(`${base_url}/sign/update-account-info`, {
                        method: "POST",
                        body: JSON.stringify(data4DB),
                        headers: {
                            "content-type" : "application/json"
                        }
                    }).then((data)=>data.json()).then((data)=>{
                        if(data.acknowledged){
                            handleClose();
                            alert("Succesfully updated account info")
                            navigate("/my-account")
                        }else{
                            alert(data.msg)
                        }
                    })
                })
            }
            console.log(values);
        }
    })

  return (
    <div>
        <h2 style={{textAlign: "center"}}>Update Account Info</h2>
        <hr />
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="leftchildupdate">
                {/* update account info form */}
                <form className="upaccountinfo" onSubmit={formik.handleSubmit}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircleIcon />
                              </InputAdornment>
                            ),
                            style: {fontSize: 15}
                          }}
                        error={formik.touched.name && formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="standard-error-helper-text"
                        label="Name"
                        name="name"
                        value = {formik.values.name}
                        variant="standard"
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                            style: {fontSize: 15}
                          }}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="standard-error-helper-text"
                        label="Email"
                        name="email"
                        value = {formik.values.email}
                        variant="standard"
                    />
                    <TextField
                        inputProps={{style: {fontSize: 15}}}
                        error={formik.touched.about && formik.errors.about}
                        helperText={formik.touched.about && formik.errors.about ? formik.errors.about : null}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="standard-error-helper-text"
                        label="About"
                        name="about"
                        value = {formik.values.about}
                        variant="standard"
                        multiline
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <FacebookIcon />
                              </InputAdornment>
                            ),
                            style: {fontSize: 15}
                          }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="standard-error-helper-text"
                        label="Facebook"
                        name="fb_link"
                        value = {formik.values.fb_link}
                        variant="standard"
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <InstagramIcon />
                              </InputAdornment>
                            ),
                            style: {fontSize: 15}
                          }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="standard-error-helper-text"
                        label="Instagram"
                        name="insta_link"
                        value = {formik.values.insta_link}
                        variant="standard"
                    />
                    <TextField
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <TwitterIcon />
                              </InputAdornment>
                            ),
                            style: {fontSize: 15}
                          }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="standard-error-helper-text"
                        label="Twitter"
                        name="twitter_link"
                        value = {formik.values.twitter_link}
                        variant="standard"
                    />
                    <button className="mcsc" type="submit">Save all changes</button>
                </form>
            </div>
            <div className="rightchildupdate">
                <img src={usrpic} alt={obj.name} className="imgup" />
                <div style={{display: "flex", marginTop: "10px", justifyContent: "space-between"}}>
                    <div>
                        <label htmlFor="ppup"><p className="setnew">Update profile pic</p></label>
                        <input onChange={fileChange} type="file" id="ppup" />
                    </div>
                    <button onClick={()=>setUsrpic("https://res.cloudinary.com/dz7pcmtxi/image/upload/v1658877142/blank-profile-picture-g3824f2029_1280_rpx6sg.png")} className="rmpp">Remove profile pic</button>
                </div>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{textAlign: "center"}}>{"Wlcome to MyTavelCompanion"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <h3 style={{textAlign: "center", color: "black"}}>Please hold on while we upload your blog.</h3>
                            <p style={{textAlign: "center", color: "red"}}>Do not click anywhere or press any button.</p>
                            <p style={{textAlign: "center"}}><img src="https://miro.medium.com/max/1400/1*CsJ05WEGfunYMLGfsT2sXA.gif" alt="uploading gif" style={{width: "200px", height: "200px", objectFit: "cover"}} /></p> 
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    </div>
  )
}

