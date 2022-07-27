import "./Forgotpwd4.css"
import { Link } from "react-router-dom"


export function Forgotpwd4() {
  return (
    <div className="fp4">
        <div>
            <h2>MyTravelCompanion</h2>
            <p>Welcome to MyTravelCompanion</p>
            <h4>You have succesfully reset your password. <br />You can now sign-in using updated credentials.</h4>
            <p>
                <Link style={{fontSize: "15px", textDecoration: "none"}} to="/login">Back to Sign-in</Link>
            </p>
        </div>
    </div>
  )
}
