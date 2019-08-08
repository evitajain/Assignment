import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';


class DashboardStudent extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render(){
        const { user } = this.props.auth;
        console.log(user.name);
        return(
            <div>
                <h1>Student Dashboard</h1>
                <h1>{user.role}</h1>
            </div>
        );
    }
}

DashboardStudent.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(withRouter(DashboardStudent));