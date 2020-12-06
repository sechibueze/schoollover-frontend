import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../_actions/AuthActions';
import Navbar from '../Navbar/Navbar';
import Alert from '../Alert/Alert';
import { APP_NAME, LOGIN_FAIL } from '../../_actions/types';
import './Login.scss';
const Login = ({ loading, login, isAuthenticated }) => {
  
  const [data, setData] = useState({
    email: '',
    password: '', 
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({...prev, [name]: value.trim()}))
  };
  const handleSubmit = e => {
    e.preventDefault();
    return login(data);
  };

  const {email, password } = data;
  if(isAuthenticated) return <Redirect to="/dashboard" />
  return ( 
    <Fragment>
      <Navbar />

      <div className="container">
        <form className="form" onSubmit={handleSubmit} id="login-form">
            
            <span className='form-logo fas fa-stream fa-2x'/>
                    
          <Alert origin={LOGIN_FAIL} />
       
          <div className="tip p-1 login-cta">
            New to { APP_NAME } ? <Link to="/signup" className=""> Sign up</Link>
          </div>
         
          <div className="form-group">
            <label htmlFor="email"> Email<sup>*</sup></label>
            <input type="email" name="email" value={email} onChange={handleChange} id="email" className="form-control" required placeholder="Email" />
          </div>
         
          <div className="form-group">
            <label htmlFor="password"> Password<sup>*</sup></label>
            <input type="password" name="password" value={password} onChange={handleChange} id="password" className="form-control" required placeholder="Password" />
            <Link to="/forgot-password" className="tip" style={{ textAlign: "right"}}> Forgot Password </Link>
          </div>
         
          <button type="submit" className="btn btn-primary"> { loading ? 'Loading...' : 'Login'} </button>

          
        </form>
        
      </div>
    </Fragment>
   );
}
 
Login.propTypes = {
  login: PropTypes.func.isRequired,
}
const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
})
export default connect( mapStatetoProps, { login})(Login);