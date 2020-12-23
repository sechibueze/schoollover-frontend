import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthContainer from '../_AuthContainer/AuthContainer';

const Dashboard = ({ loading, ...props}) => {

    if(loading) return <h1> Loading...</h1>
    return ( 
        <AuthContainer>
            <h1> Hello </h1>
        </AuthContainer>
     );
}
 
Dashboard.propTypes = {
    currentUser: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    currentUser: state.auth.currentUser,
})
export default connect(mapStateToProps)(Dashboard);