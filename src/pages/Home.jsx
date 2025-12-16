
import Navbar from "../components/Navbar"
import Footer from '../components/Footer'
import { homeSection } from "../data/HomeSection"
import { courseSection } from "../data/CourseSection"
import parse from 'html-react-parser'
import Contact from "../components/Contact"


import '../styles/Home.css'


function Home() {
  return (
    <>
    <Navbar />   
    <div className="wrapper"></div>

    {/* home */}
        <section id="home">
          <img src={homeSection.image} alt="Home section" />
            <div className="kolom">
            {parse(homeSection.content)}
            </div>
        </section>


    {/* online course */}
        <section id="courses">
          <img src={courseSection.image} alt="Courses" />
          <div className="kolom">
          {parse(courseSection.content)}
          </div>
        </section>

    {/* Contac */}
         <div id="contact">
        <div className="wrapper">
            <div className="footer">
                <div className="footer-section">
                    <h3>Les Pintar</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, culpa!</p>
                </div>
                <div className="footer-section">
                    <h3>About</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, culpa!</p>
                </div>
                <div className="footer-section">
                    <h3>Contact</h3>
                    <p>Jl. Pengasinan sawangan kota Depok</p>
                    <p>Kode Pos: 7165</p>
                </div>
                <div className="footer-section">
                    <h3>Social</h3>
                    <p><b>YouTube: </b>Programming di RumahRafif</p>
                </div>
            </div>
        </div>
    </div>
    
    <Contact/>
    <Footer />
    </>
  )
}

export default Home
