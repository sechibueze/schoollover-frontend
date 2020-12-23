import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../_actions/AuthActions';
import { APP_NAME } from '../../_actions/types';
import './AuthContainer.scss';

const AuthContainer = ({ children, currentUser, logout }) => {
  
  return ( 
    <Fragment>
      <div className="admin-page">
        <input type="checkbox" name="" id="sidebar-switcher" />
        <label htmlFor="sidebar-switcher" className="sidebar-outer"/>
        <sidebar className="sidebar">         
            <label htmlFor="sidebar-switcher" className="sidebar-close-btn fa fa-times" />
            <header>
              <Link className="admin-logo" to="/"> <span className="admin-logo-icon fas fa-stream fa-2x" /> <span className="admin-logo-name"> { APP_NAME } </span> </Link>
            </header>
            <div className="sidebar-actions">
              <Link to="/project-manager" className="sidebar-action-link"> <span className="fa fa-users admin-sidebar-icon"/> Projects</Link>
              <Link to="/investment-manager" className="sidebar-action-link"> <span className="fa fa-tags admin-sidebar-icon"/> Invest Admin</Link>
              <Link to="/my-contributions" className="sidebar-action-link"> <span className="fa fa-comment-dots admin-sidebar-icon"/> Contributions</Link>
              {
                currentUser && currentUser.auth.includes('admin') && (
                  <Fragment>
                    <Link to="/user-manager" className="sidebar-action-link"> <span className="fa fa-users admin-sidebar-icon"/> User Admin</Link>

                  </Fragment>
                )
              }
              <Link to="http://" className="sidebar-action-link"> <span className="fa fa-cogs admin-sidebar-icon"/> Settings</Link>
            
            </div>
          
        </sidebar>
        

     
          <div className="admin-navbar">
            <label for="sidebar-switcher" className="fa fa-bars fa-2x toggle-sidebar" />

            <ul className="admin-navbar-actions">
              <li>
                <Link to="/business-manager"> <span className="admin-navbar-item-icon fa fa-database" title="Tables"/> <span className="sm-hide">Business Admin</span> </Link>
              </li>
              <li>
                <Link to="/investment-manager"> <span className="admin-navbar-item-icon fa fa-grip-vertical" title="Tables"/> <span className="sm-hide">Invest Admin</span> </Link>
              </li>
              <li>
                <Link to="http://"> <span className="admin-navbar-item-icon fa fa-location-arrow" title="Tables"/> <span className="sm-hide">User Admin</span> </Link>
              </li>
              <li>
                <Link to="http://"> <span className="admin-navbar-item-icon fa fa-signature" title="Tables"/> <span className="sm-hide">Tables</span> </Link>
              </li>
              <li>
                <Link to="http://"> <span className="admin-navbar-item-icon fa fa-comment-dots" title="Tables"/> <span className="sm-hide">Tables</span> </Link>
              </li>
              
              <li className="drop-down">
                <Link href="http://" > 
                    {
                        currentUser.profileImage ? (
                            <img src={currentUser.profileImage} className="admin-navbar-item-image" alt='currenly logged in user' style={{ verticalAlign: 'middle'}} />
                        ) : (
                            <span className="admin-navbar-item-icon fa fa-user" title="Tables"/> 

                        )
                    }
                    
                    {/* <span className="sm-hide">User</span>  */}
                    <span className="fa fa-arrow-circle-down" /> 
                </Link>
                <div className="drop-down-menu">
                  <Link to="http://" className="drop-down-menu-link"> <span className="link-icon fa fa-user-alt"/> Profile</Link>
                  <Link to="http://" className="drop-down-menu-link"> <span className="link-icon fa fa-tasks"/> Projects</Link>
                  <Link to="http://" className="drop-down-menu-link"> <span className="link-icon fa fa-bookmark"/> Archive</Link>
                  <Link to="http://" className="drop-down-menu-link"> <span className="link-icon fa fa-cogs"/> Settings</Link>
                  <span onClick={() => logout()} className="drop-down-menu-link"> <span className="link-icon fa fa-sign-in-alt"/> Logout</span>
                  
                </div>
              </li>
                        
            </ul>
          </div>
          <div className="page-body"> 
            { children && children }
          </div>
      </div>
    </Fragment>
   );
}
AuthContainer.propTypes = {
  logout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
})
export default connect(mapStateToProps , { logout })(AuthContainer);