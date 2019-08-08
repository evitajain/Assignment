import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';


class DashboardLibrarian extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render(){
        // const { user } = this.props.auth;
        // console.log(user.name);
        return(
            <div className="container-fluid pl-0">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="dashboard-rightbar">
                            <h3>Quick Librarian Actions</h3>
                            <hr/>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardLibrarian.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(withRouter(DashboardLibrarian));