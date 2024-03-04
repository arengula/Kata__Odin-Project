import React from "react";
import "../css/siteHeading.css";

const SiteHeading = function() {
    return (
        <>
            <section className="navbar">
                <div className="navbar__brand">
                    <div className="navbar__logo">
                        <img 
                            className="--invert"
                            src="https://cdn-icons-png.flaticon.com/512/582/582929.png" 
                            alt="Universal Anything Shoppe" 
                        />
                    </div>
                    <div className="navbar__name">Universal Anything Shoppe</div>
                </div>
                <nav>
                    <ul className="navbar__nav">
                        <li className="navbar__menu">
                            <a href="#"> About </a>
                        </li>
                        <li className="navbar__menu">
                            <a href="#"> Store </a>
                        </li>
                        <li className="navbar__menu">
                            <a href="#"> My Cart </a>
                        </li>
                    </ul>
                </nav>
            </section>
        </>
    )
}

export default SiteHeading;