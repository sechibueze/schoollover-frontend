import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <Fragment>
            <div className='not-found-page'>
                <h1> The page you requested was not found</h1>
                <p> You might have hit a broken link. </p>
                <Link to='/'> Back to safety</Link>
            </div>
        </Fragment>
     );
}
 
export default NotFound;