import "./Editablog.css";
import { Nav } from "../nav/Nav"
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";

// DIalog box until the upload process happens
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// react toaster notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const base_url = "http://localhost:5000"

export function Editablog() {

    const{id} = useParams();

    const[blogdata, setBlogdata] = useState(null);

    useEffect(() => {
        // fetch call to get the blog data
        fetch(`${base_url}/write-a-blog/get-data-4-editing-a-blog/${id}`).then((data)=>data.json()).then((data)=>setBlogdata(data))
    }, [])
    

  return (
    <div>
        <Nav />
        {blogdata ? <Editcomponent obj={blogdata} /> : "Loading....."}
        <ToastContainer />
    </div>
  )
}




export function Editcomponent({obj}) {

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

    const[imgpreview, setImgpreview] = useState(obj.blog_pic);
    const[file2cloudinary, setFile2cloudinary] = useState(null);


    // a function to get image file data when user changes the pictures
    function changedimg(event){
        // Destructuring to get the first file from the file list
        const [newimgfile] = event.target.files;
        // if-else ladder to check whether file type is image/jpeg & it's size is less than 5mb.
        if(newimgfile.type === "image/png" || newimgfile.type === "image/jpeg"){
            if(newimgfile.size <= 5000000){
                  // To preview we create the path of the file in the local machine using the URL.createObjectURL method
                console.log(newimgfile);
                setImgpreview(URL.createObjectURL(newimgfile));
                // To store the file data that the user uploads
                setFile2cloudinary(newimgfile)
            }else{
                toast.error("Selected file size should be less than 5 mb. Please select appropriate file again")
            }
        }else{
            toast.error("Selected file type should be JPEG, JPG or PNG. Please select appropriate file again")
        }
    }

     // Yup validation schema
     const writeschema = yup.object({
        title: yup.string().required(),
        story: yup.string().required(),
        tag: yup.string().required()
    })

    // Formik creates the desired object to send the data to backend
    const formik = useFormik({
        initialValues: {title: obj.title, story: obj.story, tag: obj.tag},
        validationSchema: writeschema,
        onSubmit: (values) => {
            // Make a fetch call to cloudinary to get the url only if the initial image URl has changed. Other wise no need to change the image url leave it as it is only update the form data
            if(imgpreview === obj.blog_pic){
                handleClickOpen();
                // since the image is not updated in this case
                const data2send = {
                    ...obj,
                    title: values.title,
                    tag: values.tag,
                    story: values.story
                };
                // Make a post fetch call to DB to update the document in blogs collection
                fetch(`${base_url}/write-a-blog/edit-a-blog`, {
                    method: "POST",
                    body: JSON.stringify(data2send),
                    headers: {
                        "content-type": "application/json"
                    }
                }).then((data)=>data.json()).then((data)=>{handleClose() ;alert(data.msg); navigate("/my-account/published-blogs")})
                console.log(data2send);
            }else{
                handleClickOpen();
                // since the image has changed so we need to get url of new updated image from cloudinary before storing info in DB
                const img2upload = new FormData();
                img2upload.append('file', file2cloudinary);
                img2upload.append('upload_preset', 'mtc-uploads')
                fetch(`https://api.cloudinary.com/v1_1/dz7pcmtxi/image/upload`, {
                method: "POST",
                body: img2upload,
                }).then((data)=>data.json()).then((data)=>{
                    const data2send = {
                        ...obj,
                        title: values.title,
                        tag: values.tag,
                        story: values.story,
                        blog_pic: data.secure_url
                    }
                    // Make a post fetch call to DB to update the document in blogs collection
                    fetch(`${base_url}/write-a-blog/edit-a-blog`, {
                        method: "POST",
                        body: JSON.stringify(data2send),
                        headers: {
                            "content-type": "application/json"
                        }
                    }).then((data)=>data.json()).then((data)=>{handleClose() ;alert(data.msg); navigate("/my-account/published-blogs")})
                    console.log(data2send);
                })
            }
        }
    })


  return (
    <div>
        <form className="formwrite" onSubmit={formik.handleSubmit}>
            {/* Input field for title */}
            <input name="title" onChange={formik.handleChange} onBlur={formik.handleBlur} className="writetitle" type="text" placeholder="Title" autoFocus value={formik.values.title} />
            {formik.touched.title && formik.errors.title ? <p style={{color: "red", textAlign: "left"}}>{formik.errors.title}</p> : null}
            {/* Input field to upload an image file */}
            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
                <label className="labelplus" htmlFor="writefile"><AddIcon /></label>
                <p>Click to upload a picture. File type should be jpg, jpeg or png. File size shouldn't exceed 5 mb.</p>
                <input name="blog_pic" type="file" id="writefile" onChange={changedimg} style={{display: "none"}} />
            </div>
            <div>
                <img className="uploadimg" src={imgpreview} alt="Blog pic by user" />
            </div>
            {/* Multiline input for story of the blog  */}
            <TextField
                value={formik.values.story}
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
                value={formik.values.tag}
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
            <button className="subbtn" type="submit">Save Changes</button>
            <button className="canbtn" onClick={()=>navigate("/my-account/published-blogs")}>Cancel</button>
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

