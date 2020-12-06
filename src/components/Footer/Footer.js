import React, { Fragment } from 'react';
import './Footer.scss';

const Footer = () => {
    return ( 
        <Fragment>
            <footer className='footer'>
                <p className='copyright'> &copy; { new Date().getFullYear()} - Ensure Learning Foundation</p>
            </footer>
        </Fragment>
     );
}
 
export default Footer;