import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import Footer from './components/Footer';


//import logo from './logo.svg';
import './App.css';
//import dark from './Dark.css';










class App extends React.Component{

componentDidMount(){
  // window.onscroll = ()=>{
  // }
  window.onload = ()=>{
    document.querySelector('.loader').style.display = 'none'
  }
}
render(){



  return (
  <div>
    <div className="site">
        <div className="main">
            <Header/>
            <Router>
            <Route path="/">
              <Home/>
            </Route>
            
            <div id="about" className="about container">
            
                <About/>
            </div>
            <div id="portfolio" className="portfolio container">
                <Portfolio/>
            </div>
            <div id="contact" className="contact container">
                <Contact/>
            </div>
            </Router>
            <div className="footer">
                <Footer/>
            </div>
            <div className="loader">
                <div className="inner">
                  <div className="circle"></div>
                  <span>Gyftography</span>
                </div>
            </div>
        </div>
    </div>

  </div>

  );
}
}

export default App;
