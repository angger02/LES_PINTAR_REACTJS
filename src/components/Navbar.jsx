import '../styles/Navbar.css'


// <!-- navbar -->
function Navbar() {
  return (
    <nav>
        <div className="wrapper">
            <div className="logo"><a href=''>🎓 Les Pintar</a></div>
            <div className="menu">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#courses">Courses</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="/Login" className="tbl-biru">Login</a></li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
