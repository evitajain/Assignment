import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';
import './styles/Navigation.css';

import Navbar from "./components/layout/navbar";

class App extends Component{

  render(){
    return(
      <Router>
          <div className="App">
            <Navbar />  
          </div>
      </Router>
      
    )
  }
}

export default App;
