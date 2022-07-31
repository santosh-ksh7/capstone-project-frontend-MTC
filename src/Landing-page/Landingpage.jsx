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
                <p>We provide a platform to our creators to share their travel experience. <br></br>
                    We aim to inspire and motivate our customers to travel & explore. <br></br>
                    Join our community to stay motivated & keep exploring. <br></br>
                    Share out your experiences. <br></br>
                </p>

                {/* Body part above the footer */}
                <section class="bpaf">
                    <div class="bpafimage">
                        <img id="bpafileft1" class="bpafileft" src="https://image.shutterstock.com/mosaic_250/2780032/2021632466/stock-photo-headshot-portrait-of-confident-young-indian-woman-renter-or-tenant-pose-in-modern-own-new-apartment-2021632466.jpg" alt="" />
                        <img id="bpafileft2" class="bpafileft" src="https://image.shutterstock.com/mosaic_250/2780032/2021632466/stock-photo-headshot-portrait-of-confident-young-indian-woman-renter-or-tenant-pose-in-modern-own-new-apartment-2021632466.jpg" alt="" />
                        <img id="bpafileft3" class="bpafileft" src="https://image.shutterstock.com/mosaic_250/2780032/2021632466/stock-photo-headshot-portrait-of-confident-young-indian-woman-renter-or-tenant-pose-in-modern-own-new-apartment-2021632466.jpg" alt="" />
                        <img id="bpafiright1" class="bpafiright" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="" />
                        <img id="bpafiright2" class="bpafiright" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="" />
                        <img id="bpafiright3" class="bpafiright" src="https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg" alt="" />
                        <img class="bpaficentre" src="https://res.cloudinary.com/dz7pcmtxi/image/upload/v1658341002/mfguuzlrwf0byuqxyh8v.jpg" alt="" />
                    </div>
                    <h3 class="bpafheading">Our Travel Community</h3>
                    <p class="bpafdes">Great Experience awaits you</p>
                    <p class="bpafdes">We are certain you will love the result</p>
                </section>

                {/* body part just before footer */}
                <section class="bpjbf">
                    <div class="bpjbfcontainer">
                    <i class="fa-solid fa-lock"></i>
                        <p class="bpjbfcontdes">safe, secure & authentic content</p>
                    </div>
                    <div class="bpjbfcontainer">
                    <i class="fa-solid fa-users"></i>
                        <p class="bpjbfcontdes">20+ members</p>
                        <p class="bpjbfcontdes">Actual travel experience by community</p>
                    </div>
                    <div class="bpjbfcontainer">
                    <i class="fa-solid fa-pencil"></i>
                        <p class="bpjbfcontdes">20+ blogs</p>
                        <p class="bpjbfcontdes">Share your blog with the community</p>
                    </div>
                    <div class="bpjbfcontainer">
                    <i  class="fa-solid fa-map-location-dot"></i>
                        <p class="bpjbfcontdes">30+ destinations mapped</p>
                        <p class="bpjbfcontdes">Explore from the mapped destinations</p>
                    </div>
                    <div class="bpjbfcontainer">
                    <i class="fa-solid fa-photo-film"></i>
                        <p class="bpjbfcontdes">20+ images uploaded</p>
                        <p class="bpjbfcontdes">From across the country to explore from</p>
                    </div>
                </section>

                <hr style={{width: "83%", marginTop: "35px"}} />

                {/* body part as footer */}
                <section className="anchor" style={{display: "flex", justifyContent: "space-around", color: "grey"}}>
                    <a target="_blank" href="https://www.google.com/"><ApartmentIcon /></a>
                    <a target="_blank" href="https://www.google.com/"><EmailIcon /></a>
                    <a target="_blank" href="https://www.google.com/"><FacebookIcon /></a>
                    <a target="_blank" href="https://www.google.com/"><InstagramIcon /></a>
                    <a target="_blank" href="https://www.google.com/"><TwitterIcon /></a>
                </section>

            </div>
    </div>
  )
}
