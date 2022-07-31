import "./Login.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const base_url = "http://localhost:5000"; 

export function Login() {

    const navigate = useNavigate();

    const[showpwd, setShowpwd] = useState(false)

    const loginschema = yup.object({
      email: yup.string().required().email(),
      pwd: yup.string().required()
    })

    const formik = useFormik({
      initialValues: {email: "", pwd: ""},
      validationSchema: loginschema,
      onSubmit: (values) => {
        // fetch call to login & laert the desired message & also navigate
        fetch(`${base_url}/sign/login`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type" : "application/json"
          }
        }).then((data)=>data.json()).then((data)=>{
          if(data.msg==="Succesfully logged in"){
            alert(data.msg)
            // storing _id & JWT to local storage
            localStorage.setItem("token", data.token)
            localStorage.setItem("_id", data._id)
            // navigate to / (i.e.. landing page of your application)
            navigate("/")
          }else{
            alert(data.msg)
          }
        })
        console.log(values);
      }
    })

  return (
    <div className="logindiv">
        <div>
            <h2>MyTravelCompanion</h2>
            <p>Welcome to MyTravelCompanion</p>
            <h4>Sign-in</h4>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    style={{width: "300px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    error= {formik.touched.email && formik.errors.email ? true : false}
                    id="standard-error-helper-text"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        ),
                    }}
                    label="Email ID"
                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    variant="standard"
                />
                 <TextField
                    style={{width: "300px", marginTop: "10px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="pwd"
                    error= {formik.touched.pwd && formik.errors.pwd ? true : false}
                    id="standard-password-input"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <KeyIcon />
                            </InputAdornment>
                          ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={()=> setShowpwd(!showpwd)}>
                                {showpwd ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                    }}
                    label="Password"
                    helperText={formik.touched.pwd && formik.errors.pwd ? formik.errors.pwd : null}
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                />
                <Link style={{marginLeft: "68%", fontSize: "13px", textDecoration: "none"}} to="/forgot-password-1">Forgot Password?</Link>
                <button type="submit">Sign-in</button>
            </form>
            <p style={{color: "grey"}}>----------or---------</p>
            <Link style={{marginLeft: "5%", fontSize: "15px", textDecoration: "none"}} to="/create-account">New to MyTravelCompanion? Create Account</Link>
        </div>
    </div>
  )
}
