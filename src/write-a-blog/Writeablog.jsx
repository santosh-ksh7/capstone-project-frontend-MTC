import "./Writeablog.css"
import { Nav } from "../nav/Nav"
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



const base_url = "http://localhost:5000"


export function Writeablog() {
  return (
    <div>
        <Nav />
            <div className="leftchild">
                <Writesubcomponent />
            </div>
    </div>
  )
}




export function Writesubcomponent() {

    const navigate = useNavigate();

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
                alert("Selected file size should be less than 5 mb. Please select appropriate file again")
            }
        }else{
            alert("Selected file type should be JPEG, JPG or PNG. Please select appropriate file again")
        }
       
    };

    // Yup validation schema
    const writeschema = yup.object({
        title: yup.string().required(),
        story: yup.string().required(),
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
                            "content-type" : "application/json"
                        }
                    }).then((data)=>data.json()).then((data)=>{
                        if(data.acknowledged){
                            alert("The blog post is succesfully uploaded. Redirecting to home.");
                            navigate("/home");
                        }
                        console.log(data)
                    })
                })
            }else{
                alert("An image must be selected to succesfully upload a blog")
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
        </form>
    </div>
  )
}
