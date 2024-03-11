import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import { Link } from "react-router-dom"

import "../styles/navbar.css"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm mx-0 px-4 py-2 bg-light">
            <a href="." className="navbar-brand">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/2838/2838838.png" 
                    alt="SHOPPE" 
                />
                <p className=" py-0 my-0">SHOPPE</p>
            </a>
            <ul className="navbar-nav">
                <li className="nav-item px-2">
                    <Link to="." className="nav-link">About</Link>
                </li>
                <li className="nav-item px-2">
                    <Link to="./shop" className="nav-link"> Shop </Link>
                </li>
                <li className="nav-item px-2">
                    <Link to="./mycart" className="nav-link"> My Cart </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;