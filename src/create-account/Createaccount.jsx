import "./Createaccount.css"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup"
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


// const base_url = "http://localhost:5000";
const base_url = "https://mtc-santosh.herokuapp.com"



export function Createaccount() {

    const navigate = useNavigate();

    const[showpwd, setShowpwd] = useState(false)

    const createaccschema = yup.object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      pwd: yup.string().required().min(8),
      re_pwd: yup.string().required().oneOf([yup.ref("pwd"), null], "passwords doesn't match"),
    })

    const formik = useFormik({
      initialValues: {name: "", email: "", pwd: "", re_pwd: ""},
      validationSchema: createaccschema,
      onSubmit: (values) => {
        // fetch call to register the user & then alert the mesaage from response accordingly & navigate
        fetch(`${base_url}/sign/register`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-type": "application/json",
          }
        }).then((data)=> data.json()).then((data)=>{
          if(data.msg === "can't create user because email already registered"){
            alert(data.msg)
          }else{
            alert(data.msg);
            navigate("/login")
          }
        })
        console.log(values);
      }
    })

  return (
    <div className="createacccomp">
        <div>
            <h2 style={{textAlign: "center"}}>MyTravelCompanion</h2>
            <p>Welcome to MyTravelCompanion</p>
            <h4>Register / Create New Account</h4>
            <form onSubmit={formik.handleSubmit}>
            <TextField
                    style={{width: "300px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                    error= {formik.touched.name && formik.errors.name ? true : false}
                    helperText={formik.touched.name && formik.errors.name ? formik.errors.name : null}
                    id="standard-error-helper-text"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon />
                          </InputAdornment>
                        ),
                    }}
                    label="Name"
                    variant="standard"
                />
            <TextField
                    style={{width: "300px", marginTop: "10px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    error= {formik.touched.email && formik.errors.email ? true : false}
                    helperText={formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    id="standard-error-helper-text"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        ),
                    }}
                    label="Email ID"
                    variant="standard"
                />
                 <TextField
                    style={{width: "300px", marginTop: "10px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="pwd"
                    error= {formik.touched.pwd && formik.errors.pwd ? true : false}
                    helperText={formik.touched.pwd && formik.errors.pwd ? formik.errors.pwd : null}
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
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                />
                <TextField
                    style={{width: "300px", marginTop: "10px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="re_pwd"
                    error= {formik.touched.re_pwd && formik.errors.re_pwd ? true : false}
                    helperText={formik.touched.re_pwd && formik.errors.re_pwd ? formik.errors.re_pwd : null}
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
                    label="Re-enter Password"
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                />
                <button style={{marginTop: "10px", marginLeft: "32%"}} type="submit">Create Account</button>
            </form>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/login">Back to Sign-in</Link>
            </p>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/forgot-password-1">Forgot Password?</Link>
            </p>
        </div>
    </div>
  )
}
