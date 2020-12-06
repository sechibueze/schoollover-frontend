import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestPasswordReset } from '../../_actions/AuthActions';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alert/Alert';
import {  REQUEST_PASSWORD_RESET } from '../../_actions/types';
import './ForgotPassword.scss';
const ForgotPassword = ({ loading, requestPasswordReset }) => {
  
  const [data, setData] = useState({
    email: '',
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({...prev, [name]: value.trim()}))
  };
  const handleSubmit = e => {
    e.preventDefault();
    return requestPasswordReset(data);
  };

  const { email } = data;

  return ( 
    <Fragment>
      <Navbar />

      <div className="container">
        <form className="form" onSubmit={handleSubmit} id="forgot-password-form">
            
            <span className='form-logo fas fa-stream fa-2x'/>
                    
          <Alert origin={REQUEST_PASSWORD_RESET} />
       
          <div className="tip">
            Request a link to reset your password
          </div>
         
          <div className="form-group">
            <label htmlFor="email"> Email<sup>*</sup></label>
            <input type="email" name="email" value={email} onChange={handleChange} id="email" className="form-control" required placeholder="Email" />
          </div>
         
          <button type="submit" className="btn btn-primary"> { loading ? 'Loading...' : 'Recover password'} </button>

          
        </form>
        
      </div>
    </Fragment>
   );
}
 
ForgotPassword.propTypes = {
  requestPasswordReset: PropTypes.func.isRequired,
}
const mapStatetoProps = state => ({
  loading: state.auth.loading,
})
export default connect( mapStatetoProps, { requestPasswordReset })(ForgotPassword);