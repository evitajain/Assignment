import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authentication';
import { withRouter } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import AddBook from '../adminPages/AddBook';
import { HashRouter, Route, Switch } from "react-router-dom";
import DbAdmin from "../adminPages/DbAdmin";
import BookCategory from '../adminPages/BookCat'; 
import ViewBook from "../adminPages/ViewBook";
import BookManage from '../adminPages/BookManage';
import EditBook from '../adminPages/EditBook';
    
class Dashboard extends Component {


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
                            <h3>Quick Actions</h3>
                            <hr/>
                            <Switch>
                                <Route exact path='/' component={DbAdmin}/>
                                <Route path='/addBook' component={AddBook} />  
                                <Route path='/addCategory' component={BookCategory} /> 
                                <Route path='/viewBook' component={ViewBook} />
                                <Route path='/book_manage' component={BookManage} />
                                <Route path='/editBook' component={EditBook} />
                            </Switch>
                        </div>
                    </div>
                    
                </div>
                </HashRouter>
            </div>
        );
    }
}

Dashboard.propTypes = {
   // newbooks: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{logoutUser})(withRouter(Dashboard));