import "./Nav.css";
import { Link} from 'react-router-dom';
import logo from "./Logo.png";


// Navbar
export function Nav() {
    return (
          <div className='topnavbar'>
              <div className="topbarlogodes">
                  <img className='topbarlogo' src={logo} alt="Company logo" />
              </div>
              <div className='topbarlinks'>
                  {/* update the {{{{{{{{{{to}}}}}}}}}} attributes accordingly */}
                  <Link style={{textDecoration: "none", color: "white"}} to="/home" >HOME</Link>
                  <Link style={{textDecoration: "none", color: "white"}} to="/write" >WRITE</Link>
                  <Link style={{textDecoration: "none", color: "white"}} to="/write" >Sign-in</Link>
              </div>
          </div>
    )
  }