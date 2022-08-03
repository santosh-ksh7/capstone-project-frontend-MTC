import "./Landingpage.css";
import { Nav } from '../nav/Nav.jsx';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ApartmentIcon from '@mui/icons-material/Apartment';

export function Landingpage() {
  return (
    <div>
        <Nav />
            <div>
                <h2 style={{textAlign: "center"}}>MyTavelCompanion</h2>
                <p>We are a platform to our creators to share their travel experience. <br></br>
                    We aim to inspire and motivate our customers to travel & explore. <br></br>
                    Join our community to stay motivated & keep exploring. <br></br>
                    Share out your experiences. <br></br>
                </p>

                {/* Body part above the footer */}
                <section className="bpaf">
                    <div className="bpafimage">
                        <img id="bpafileft1" className="bpafileft" src="https://image.shutterstock.com/mosaic_250/2780032/2021632466/stock-photo-headshot-portrait-of-confident-young-indian-woman-renter-or-tenant-pose-in-modern-own-new-apartment-2021632466.jpg" alt="" />
                        <img id="bpafileft2" className="bpafileft" src="https://image.shutterstock.com/mosaic_250/2780032/2021632466/stock-photo-headshot-portrait-of-confident-young-indian-woman-renter-or-tenant-pose-in-modern-own-new-apartment-2021632466.jpg" alt="" />
                        <img id="bpafileft3" className="bpafileft" src="https://image.shutterstock.com/mosaic_250/2780032/2021632466/stock-photo-headshot-portrait-of-confident-young-indian-woman-renter-or-tenant-pose-in-modern-own-new-apartment-2021632466.jpg" alt="" />
                        <img id="bpafiright1" className="bpafiright" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="" />
                        <img id="bpafiright2" className="bpafiright" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="" />
                        <img id="bpafiright3" className="bpafiright" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="" />
                        <img className="bpaficentre" src="https://res.cloudinary.com/dz7pcmtxi/image/upload/v1658341002/mfguuzlrwf0byuqxyh8v.jpg" alt="" />
                    </div>
                    <h3 className="bpafheading">Our Travel Community</h3>
                    <p className="bpafdes">Great Experience awaits you</p>
                    <p className="bpafdes">We are certain you will love the result</p>
                </section>

                {/* body part just before footer */}
                <section className="bpjbf">
                    <div className="bpjbfcontainer">
                    <i className="fa-solid fa-lock"></i>
                        <p className="bpjbfcontdes">safe, secure & authentic content</p>
                    </div>
                    <div className="bpjbfcontainer">
                    <i className="fa-solid fa-users"></i>
                        <p className="bpjbfcontdes">20+ members</p>
                        <p className="bpjbfcontdes">Actual travel experience by community</p>
                    </div>
                    <div className="bpjbfcontainer">
                    <i className="fa-solid fa-pencil"></i>
                        <p className="bpjbfcontdes">20+ blogs</p>
                        <p className="bpjbfcontdes">Share your blog with the community</p>
                    </div>
                    <div className="bpjbfcontainer">
                    <i  className="fa-solid fa-map-location-dot"></i>
                        <p className="bpjbfcontdes">30+ destinations mapped</p>
                        <p className="bpjbfcontdes">Explore from the mapped destinations</p>
                    </div>
                    <div className="bpjbfcontainer">
                    <i className="fa-solid fa-photo-film"></i>
                        <p className="bpjbfcontdes">20+ images uploaded</p>
                        <p className="bpjbfcontdes">From across the world</p>
                    </div>
                </section>

                <hr style={{width: "83%", marginTop: "35px"}} />

                {/* body part as footer */}
                <section className="anchor" style={{display: "flex", justifyContent: "space-around", color: "grey"}}>
                    <p style={{display: "flex", flexDirection: "column", fontSize: "13px", alignItems: "center"}}><ApartmentIcon /> H.no-xyz, Delhi-831011</p>
                    <p style={{display: "flex", flexDirection: "column", fontSize: "13px", alignItems: "center"}}><EmailIcon /> xyzxyz@gmail.com</p>
                    <p style={{display: "flex", flexDirection: "column", fontSize: "13px", alignItems: "center"}}><FacebookIcon /> www.facebook.com/xyxxyxxyx</p>
                    <p style={{display: "flex", flexDirection: "column", fontSize: "13px", alignItems: "center"}}><InstagramIcon />www.instagram.com/xyxxyxxyx</p>
                    <p style={{display: "flex", flexDirection: "column", fontSize: "13px", alignItems: "center"}}><TwitterIcon />www.twitter.com/xyxxyxxyx</p>
                </section>

            </div>
    </div>
  )
}
