import "./Forgotpwd2.css"
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import KeyIcon from '@mui/icons-material/Key';



const base_url = "http://localhost:5000";

export function Forgotpwd2() {

  const navigate = useNavigate();

  const forgotpwd2schema = yup.object({
    otp: yup.string().required().min(10)
  })

  const formik = useFormik({
    initialValues: {otp: ""},
    validationSchema: forgotpwd2schema,
    onSubmit: (values) => {
      // fetch call to validate the OTP 
      // remember to send the email info stored in local storage in order to identify which user to upadte the password for
      let data2send = {
        ...values,
        email: localStorage.getItem("email")
      }
      fetch(`${base_url}/sign/validate-OTP`, {
        method: "POST",
        body: JSON.stringify(data2send),
        headers: {
          "content-type" : "application/json"
        }
      }).then((data)=>data.json()).then((data)=>{
        if(data.msg==="OTP didn't match. Enter the exact OTP sent to your registered email."){
          alert(data.msg)
        }else{
          alert(data.msg)
          // navigate to next stage of reset password flow
          navigate("/forgot-password-3")
        }
      })
      console.log(values, data2send);
    }
  })

  return (
    <div className="fp2">
        <div>
            <h2>MyTravelCompanion</h2>
            <p>Welcome to MyTravelCompanion</p>
            <h4>Validate OTP</h4>
            <p><MarkEmailReadIcon /></p>
            <p>Check your mail. <br></br>We have sent an OTP to reset your password.</p>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    style={{width: "300px"}}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="otp"
                    error= {formik.touched.otp && formik.errors.otp ? true : false}
                    id="standard-error-helper-text"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <KeyIcon />
                          </InputAdornment>
                        ),
                    }}
                    label="OTP"
                    helperText={formik.touched.otp && formik.errors.otp ? formik.errors.otp : null}
                    variant="standard"
                />
                <button style={{marginTop: "10px", marginLeft: "35%", cursor: "pointer"}} type="submit">Validate OTP</button>
            </form>
            <p style={{color: "grey"}}>----------or---------</p>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/login">Back to Sign-in</Link>
            </p>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/create-account">New to MyTravelCompanion? Create Account</Link>
            </p>
        </div>
    </div>
  )
}
