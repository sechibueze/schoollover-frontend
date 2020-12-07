import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../_actions/types';
import './Navbar.scss';

const Navbar = () => {
    const [navbarFixedPosition, fixNavbarOnScroll] = useState(false);
    const handleNavbarPosition = () => {
      const offset = window.scrollY;
      if (offset > 70) {
         fixNavbarOnScroll(true);
      }
    };
    useEffect(() => {
      window.addEventListener('scroll', handleNavbarPosition);
    });

    console.log('Navbar fixed state', navbarFixedPosition)
    return ( 
        <nav className={`navbar ${ navbarFixedPosition ? 'fixed' : ''}` }>
            <input type="checkbox" id="toggle-nav-menu" />
            <div className="navbar-container">
            <Link className="logo" to="/">
                <span className="logo-icon fas fa-stream fa-2x" />
                <span className="logo-name"> { APP_NAME } </span>
            </Link>

            <label htmlFor="toggle-nav-menu" className="menu-icon">
                <span className="fa fa-bars fa-2x" style={{ lineHeight: '4'}}/>
            </label>
            <div className="navlinks">
                <Link to="/projects" className="nav-item"> Projects </Link>
                <Link to="/learn" className="nav-item"> Learn </Link>
                <Link to="/login" className="nav-item"> Login </Link>
                {/* <Link to="#our-works" className="nav-item"> Solutions </Link>
                <Link to="#contact" className="nav-item"> Contact </Link> */}

                <Link to="/signup" className="nav-item navbar-cta"> Signup </Link>

            </div>
            </div>
        </nav>
     );
}
 
export default Navbar;