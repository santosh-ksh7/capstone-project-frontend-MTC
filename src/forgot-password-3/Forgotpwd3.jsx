import "./Forgotpwd3.css"
import KeyIcon from '@mui/icons-material/Key';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup"
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


// react toastift
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





// const base_url = "http://localhost:5000";
const base_url = "https://mtc-santosh.herokuapp.com"


export function Forgotpwd3() {

    const navigate = useNavigate();

    const[showpwd, setShowpwd] = useState(false)

    const forgotpwd3schema = yup.object({
        new_pwd: yup.string().required().min(8),
        re_new_pwd: yup.string().required().oneOf([yup.ref("new_pwd"), null], "passwords doesn't match").min(8),
      })
  
      const formik = useFormik({
        initialValues: {new_pwd: "", re_new_pwd: ""},
        validationSchema: forgotpwd3schema,
        onSubmit: (values) => {
            // fetch call to reset the password
            // remember to send the email info stored in local storage in order to identify which user to upadte the password for
            let data2send = {
                ...values,
                email: localStorage.getItem("email")
            }
            fetch(`${base_url}/sign/reset-password`, {
                method: "POST",
                body: JSON.stringify(data2send),
                headers: {
                    "content-type": "application/json"
                }
            }).then((data)=>data.json()).then((data)=>{
                // alert(data.msg)
                toast.success(data.msg)
                localStorage.removeItem("email")
                navigate("/login")
            })
          console.log(values, data2send);
        }
      })

  return (
    <div className="fp3">
        <div>
            <h2 style={{textAlign: "center"}}>MyTravelCompanion</h2>
            <p>Welcome to MyTravelCompanion</p>
            <h4>Reset Password</h4>
            <p><KeyIcon /></p>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    style={{width: "300px", marginTop: "10px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="new_pwd"
                    error= {formik.touched.new_pwd && formik.errors.new_pwd ? true : false}
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
                    label="New Password"
                    helperText={formik.touched.new_pwd && formik.errors.new_pwd ? formik.errors.new_pwd : null}
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                />
                <TextField
                    style={{width: "300px", marginTop: "10px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="re_new_pwd"
                    error= {formik.touched.re_new_pwd && formik.errors.re_new_pwd ? true : false}
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
                    label="Re-enter New Password"
                    helperText={formik.touched.re_new_pwd && formik.errors.re_new_pwd ? formik.errors.re_new_pwd : null}
                    type={showpwd ? "text" : "password"}
                    variant="standard"
                />
                <button style={{marginTop: "10px", marginLeft: "32%"}} type="submit">Reset Password</button>
            </form>
            <p style={{color: "grey"}}>----------or---------</p>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/login">Back to Sign-in</Link>
            </p>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/create-account">New to MyTravelCompanion? Create Account</Link>
            </p>
        </div>
        <ToastContainer />
    </div>
  )
}
