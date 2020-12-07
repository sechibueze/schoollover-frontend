import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearAlert } from '../../_actions/AlertActions';
import './Alert.scss';

const Alert = ({ alertBucket, origin, clearAlert }) => {
  const reqAlert = alertBucket.filter(alert => alert.origin === origin);
  return ( 
    <Fragment>
      {
      reqAlert.length > 0 && reqAlert.map(alert => {
        const {alertId, alertText, type } = alert;
        return (
          <div className={`alert alert-${type}`}> 
            <span className='fa fa-info-circle' style={{ paddingRight: '0.5rem'}}/>
            { alertText} 
            <span className='alert-dismiss fa fa-times' onClick={() => clearAlert(alertId)} />
          </div>
        )
        
      })
    }
    </Fragment>
   );
}
Alert.propTypes = {
  clearAlert: PropTypes.func.isRequired,
  alertBucket: PropTypes.array.isRequired,
}
 const mapStateToProps = state => ({
   alertBucket: state.alerts.alertBucket
 })
export default connect(mapStateToProps, { clearAlert })(Alert);