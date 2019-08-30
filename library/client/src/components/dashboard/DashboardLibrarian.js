import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import { HashRouter, Route, Switch } from "react-router-dom";
import Sidebar from '../layout/Sidebar';
import DbLibrarian from '../librarianPages/DbLibrarian';
import LibraryBookManage from '../librarianPages/LibraryBookManage';
import LibraryViewBook from '../librarianPages/LibraryViewBook';

class DashboardLibrarian extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
      };

    render(){

        return(
            <div className="container-fluid pl-0">
                <HashRouter>
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="dashboard-rightbar">
                            <h3>Quick Librarian Actions</h3>
                            <hr/>
                            <Switch>
                                <Route exact path='/' component={DbLibrarian}/>
                                <Route exact path='/librarian_book_manage' component={LibraryBookManage}/>
                                <Route exact path='/libraryViewBook' component={LibraryViewBook}/>
                            </Switch>

                        </div>
                    </div>
                </div>
                </HashRouter>
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