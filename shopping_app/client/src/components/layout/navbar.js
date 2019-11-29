import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {menu} from '../../constants/menu.constant';  


class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu_list: []
        }
    }
    
    render(){
    
        var menu_list = Object.values(menu);
        
        return(
            <div className="container-fluid pl-0 pr-0">   
                <div className="navHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <Link to="/" className="navbar-brand">Shopping Cart</Link>
                            </div>
                            <div className="col-md-3">
                                <input className="form-control search" placeholder="Search..."></input>
                            </div>
                            <div className="col-md-4">
                                <ul className="navbar-nav navbar-expand justify-content-end">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/"><i className="fas fa-sign-in-alt"></i>Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/"><i className="fas fa-user-plus"></i>Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/"><i className="fas fa-shopping-cart"></i>Cart</Link>
                                    </li>
                                </ul>    
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="mainNav navbar navbar-default navbar-expand-md">
                    <div className="container">
                        <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-start" id="navbarCollapse">
                            <ul className="navbar-nav">
                                {
                                    menu_list.map(menu =>(
                                        <li className={menu.class} key={menu.name}>
                                            <Link className="nav-link" to={menu.link}>{menu.name}</Link>
                                        </li>
                                    ))
                                }			
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;