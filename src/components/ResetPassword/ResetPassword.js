import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../_actions/AuthActions';
import { setAlert } from '../../_actions/AlertActions';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alert/Alert';
import {  RESET_PASSWORD } from '../../_actions/types';
import './ResetPassword.scss';
import { Redirect } from 'react-router-dom';

const ResetPassword = ({ loading, match, setAlert, authResetPassword, resetPassword }) => {
  
  const [data, setData] = useState({
    newPassword: '',
    confirmNewPassword: '',
    passwordResetToken: match.params.passwordResetToken,
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({...prev, [name]: value.trim()}))
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = data;
    if (newPassword !== confirmNewPassword) {
        return setAlert('Password must match', RESET_PASSWORD);
    };
    return resetPassword(data);
  };

  const { newPassword, confirmNewPassword } = data;
  if (authResetPassword !== null) {
    setAlert('Password updated, Login', RESET_PASSWORD, 'success');
    return <Redirect to='/login'/>
  }
  return ( 
    <Fragment>
      <Navbar />

      <div className="container">
        <form className="form" onSubmit={handleSubmit} id="reset-password-form">
            
            <span className='form-logo fas fa-stream fa-2x'/>
                    
          <Alert origin={RESET_PASSWORD} />
       
          <div className="tip">
            Reset your password
          </div>
         
          <div className="form-group">
            <label htmlFor="newPassword"> New password<sup>*</sup></label>
            <input type="password" name="newPassword" value={newPassword} onChange={handleChange} id="newPassword" className="form-control" required placeholder="New password" />
          </div>

          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New password<sup>*</sup></label>
            <input type="password" name="confirmNewPassword" value={confirmNewPassword} onChange={handleChange} id="confirmNewPassword" className="form-control" required placeholder="Confirm your New password" />
          </div>
         
          <button type="submit" className="btn btn-primary"> { loading ? 'Loading...' : 'Reset password'} </button>

          
        </form>
        
      </div>
    </Fragment>
   );
}
 
ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}
const mapStatetoProps = state => ({
  loading: state.auth.loading,
  authResetPassword: state.auth.authResetPassword,
})
export default connect( mapStatetoProps, { resetPassword, setAlert })(ResetPassword);