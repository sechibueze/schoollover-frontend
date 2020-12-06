import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmUserAccount } from '../../_actions/AuthActions';
import { setAlert } from '../../_actions/AlertActions';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alert/Alert';
import {  CONFIRM_USER_ACCOUNT } from '../../_actions/types';
import './AccountConfirmation.scss';
import { Redirect } from 'react-router-dom';

const AccountConfirmation = ({ loading, match, setAlert, authConfirmAccount, confirmUserAccount }) => {
  
  const [data] = useState({
    id: match.params.id,
  });
  let handleAccountConfirmation = confirmUserAccount(data);
  useEffect( handleAccountConfirmation , []);

  if (authConfirmAccount !== null) {
    setAlert('Account confirmed', CONFIRM_USER_ACCOUNT, 'success');
    return <Redirect to='/login' />
  }
  return ( 
    <Fragment>
      <Navbar />

      <div className="container">
        <form className="form" id="reset-password-form">
            
            <span className='form-logo fas fa-stream fa-2x'/>
                    
          <Alert origin={CONFIRM_USER_ACCOUNT} />
       
          <div className="tip">
            Account confrimation 
          </div>
         
         
         
          <button type="submit" className="btn btn-primary"> { loading ? 'Loading...' : 'Reset password'} </button>

          
        </form>
        
      </div>
    </Fragment>
   );
}
 
AccountConfirmation.propTypes = {
  confirmUserAccount: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
}
const mapStatetoProps = state => ({
  loading: state.auth.loading,
  authConfirmAccount: state.auth.loading,
})
export default connect( mapStatetoProps, { confirmUserAccount, setAlert })(AccountConfirmation);