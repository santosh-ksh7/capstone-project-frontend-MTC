import "./Writeablog.css"
import { Nav } from "../nav/Nav"
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Ifnotloggedin } from "../if-not-logged-in/Ifnotloggedin";

// DIalog box until the upload process happens
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// react toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const base_url = "http://localhost:5000"


export function Writeablog() {
  return (
    <div>
        {localStorage.getItem("_id") ? 
            <div>
                <Nav />
                <div className="leftchild">
                    <Writesubcomponent />
                </div>
            </div>
            : 
            <Ifnotloggedin />}
            <ToastContainer />
    </div>
  )
}




export function Writesubcomponent() {

    const navigate = useNavigate();

    // dialog-box logic from material UI
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    // dialog-box logic from material UI

    const[file2cloudinary, setFile2cloudinary] = useState(null)     // This holds the file data that user uploads
    const[imgpreview, setImgpreview] = useState(null)               // this holds the image file data
    const[showimg, setShowimg] = useState(false)                    // to show or to hide the image preview

    // A function that gets the path of image from the local system to preview it in webpage
    const changedimg = (e) => {
        // e is an ocChange event which holds an array of file in e.target.files. We use destructuring of array to get hold of file info (we are only using a single file upload, hence destructured the 0 index)
        const [file] = e.target.files;
        // if-else ladder to check whether file type is image/jpeg & it's size is less than 5mb.
        if(file.type === "image/png" || file.type === "image/jpeg"){
            if(file.size <= 5000000){
                  // To preview we create the path of the file in the local machine using the URL.createObjectURL method
                console.log(file);
                setImgpreview(URL.createObjectURL(file));
                setShowimg(true);
                // To store the file data that the user uploads
                setFile2cloudinary(file)
            }else{
                toast.error("Selected file size should be less than 5 mb. Please select appropriate file again")
            }
        }else{
            toast.error("Selected file should be an image & of type should be JPEG, JPG or PNG. Please select appropriate file again")
        }
       
    };

    // Yup validation schema
    const writeschema = yup.object({
        title: yup.string().required(),
        story: yup.string().required().min(200),
        tag: yup.string().required()
    })

    // Formik creates the desired object to send the data to backend
    const formik = useFormik({
        initialValues: {title: "", story: "", tag: ""},
        validationSchema: writeschema,
        onSubmit: (values) => {
            // image to upload to cloudinary (using fetch API of cloudinary) & get back the URL of uploaded image to store it in DB blogs collection
            // Before this step ensure that there is an image file selected
            if(file2cloudinary){
                handleClickOpen();
                const img2upload = new FormData();
                img2upload.append('file', file2cloudinary);
                img2upload.append('upload_preset', 'mtc-uploads')
                fetch(`https://api.cloudinary.com/v1_1/dz7pcmtxi/image/upload`, {
                    method: "POST",
                    body: img2upload,
                }).then((data)=>data.json()).then((data)=>{ 
                    const data2putindb = {
                        ...values,
                        blog_pic: data.secure_url,
                        author_id: localStorage.getItem("_id")
                    };
                    console.log(data2putindb);
                    fetch(`${base_url}/write-a-blog/upload-blog`, {
                        method: "POST",
                        body: JSON.stringify(data2putindb),
                        headers: {
                            "content-type" : "application/json",
                            "x-auth-token": localStorage.getItem("token")
                        }
                    }).then((data)=>data.json()).then((data)=>{
                        if(data.acknowledged){
                            handleClose();
                            // alert("The blog post is succesfully uploaded. Redirecting to home.");
                            navigate("/home");
                        }
                        console.log(data)
                    })
                })
            }else{
                toast.error("An image must be selected to succesfully upload a blog")
            }
        }
    })

  return (
    <div>
        <form className="formwrite" onSubmit={formik.handleSubmit}>
            {/* Input field for title */}
            <input name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} className="writetitle" type="text" placeholder="Title" autoFocus />
            {formik.touched.title && formik.errors.title ? <p style={{color: "red", textAlign: "left"}}>{formik.errors.title}</p> : null}
            {/* Input field to upload an image file */}
            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                <label className="labelplus" htmlFor="writefile"><AddIcon /></label>
                <p>Click to upload a picture. File type should be jpg, jpeg or png. File size shouldn't exceed 5 mb.</p>
                <input name="blog_pic" type="file" id="writefile" onChange={changedimg} style={{display: "none"}} />
            </div>
            {/* To show or hide the preview */}
            { showimg ?<div><img className="uploadimg" src={imgpreview} alt="Blog pic by user" /></div> : null}
            {/* Multiline input for story of the blog  */}
            <TextField
                name="story" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{padding: "10px"}}
                id="standard-size-normal"
                placeholder="Write your story........."
                multiline
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                  }}
            />
            {formik.touched.story && formik.errors.story ? <p style={{color: "red", textAlign: "left"}}>{formik.errors.story}</p> : null}
            {/* Input field for tag */}
            <TextField
                name="tag" 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{padding: "10px"}}
                id="input-with-icon-textfield"
                placeholder="Give a suitable tag for your blog"
                InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <i className="fa-solid fa-tags"></i>
                        </InputAdornment>
                    ),
                }}
                variant="standard"
            />
            {formik.touched.tag && formik.errors.tag ? <p style={{color: "red", textAlign: "left"}}>{formik.errors.tag}</p> : null}
            <button className="subbtn" type="submit">Publish your blog</button>
            <input className="resbtn" onClick={()=> {setImgpreview(null); setShowimg(false); setFile2cloudinary(null)}} type="reset" value="reset" />
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
        </form>
    </div>
  )
}
