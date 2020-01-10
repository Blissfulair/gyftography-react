import React from 'react';
import {
    BrowserRouter as Router,
    // Switch,
    // Route,
    Link
  } from "react-router-dom";
// import Footer from './Footer';
// import Portfolios from '../pages/Portfolios';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            mainMenuShow:true,
            mobileMenuShow:false
        }
    }

    componentDidMount(){
        let lastNav='';
        window.onscroll = (e)=>{
             navColor()
            if(!this.isInViewport(document.querySelector('.home'))){
                document.querySelector('.inner-header').style.background = 'rgba(0,0,0,0.7)';
            }
            else{
             document.querySelector('.inner-header').style.background = 'transparent';
            }
        }

        function elementInViewPort(elem) {
            var rect = elem.getBoundingClientRect();
            var ch = window.innerHeight >=  rect.bottom*0.63 && rect.top >= ((window.innerHeight)*-1)*0.1 
            return ch 
        };
        function navColor(){
            var elements = (document.querySelector('.menu') != null)?document.querySelector('.menu').children: document.querySelector('.mmenu').firstElementChild.children;
            for(var i = 0; i < elements.length; i++){
            var nav = elements[i].firstElementChild.getAttribute('href').split('#')[1];
           nav = (nav !== undefined)? nav:'home'
            
                elements[i].firstElementChild.classList.remove('active')

                var element = document.getElementById(nav);
                nav = (nav === 'home')?'/': '/#'+nav;
                if(element != null && elementInViewPort(element)){
                    lastNav = nav
                   document.querySelector('[href="'+nav+'"]').classList.add('active')
                }else if(lastNav !== ''){
                    document.querySelector('[href="'+lastNav+'"]').classList.add('active')
                }
                
                
             }
        }
    }

    isInViewport = function (elem) {
        var bounding = elem.getBoundingClientRect();
        if(bounding.top > ((window.innerHeight)*-1)*0.89)
        return true;
    };
    //toggle main menu
    mainMenu =()=>{
        if(this.state.mainMenuShow){
            document.querySelector('.menu').style.transform = 'translateY(-250%)';
            this.setState({mainMenuShow:false})
        }else{
            this.setState({mainMenuShow:true})
            document.querySelector('.menu').style.transform = 'translateY(0)';
        }
    }

    //Make Navigation item active
    headerNav(e){
        const menuList = e.target.parentElement.parentElement.children;
        for(let i = 0; i < menuList.length; i++){
            menuList[i].firstElementChild.classList.remove('active')
        }
       e.target.parentElement.firstElementChild.classList.add('active')
        let nav = e.target.parentElement.firstElementChild.getAttribute('href').split('#')[1];
        nav = (nav === undefined)?'home':nav;
        //document.querySelector('#'+nav).style.transition = 'all 3000ms ease-in-out'
        document.querySelector('#'+nav).scrollIntoView({
            behavior:'smooth'
        })
    }

    //close the mobile nav
    closeMobileMenu =()=>{
        document.querySelector('.mmenu').style.transform = 'translateX(150%)';
        document.querySelector('.cross').style.display ='none'
        document.querySelector('.open').style.display ='grid';
        if(this.state.mobileMenuShow)
        document.querySelector('.inner-header').style.background ='rgba(0,0,0,0.7)';
        
    }
    //to open the mobile nav
    openMobileMenu =()=>{
        document.querySelector('.mmenu').style.transform = 'translateX(50%)';
        document.querySelector('.open').style.display ='none';
        document.querySelector('.cross').style.display ='flex'
        document.querySelector('.inner-header').style.background ='transparent';
        if(this.isInViewport(document.querySelector('.home'))){
            this.setState({mobileMenuShow:false})
        }
        else{
            this.setState({mobileMenuShow:true})
        }
        
    }

    //to render the Header HTML
    render(){
        return (
            <Router>
            <div className="inner-header">
                <div className="header">
                    <ul className="menu">
                        <li ><Link onClick={this.headerNav} to="/" className="active">Home</Link></li>
                        <li><Link onClick={this.headerNav} to="/#about">About</Link></li>
                        <li><Link onClick={this.headerNav} to="/#portfolio">Portfolio</Link></li>
                        <li><Link onClick={this.headerNav} to="/#contact">Contact</Link></li>
                    </ul>
                    <div className="main-menu">
                        <div onClick={this.mainMenu}  className="hambuger">
                            <div className="row">
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                            </div>
                            <div className="row">
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hambuger mobile-menu">
                    <div onClick={this.openMobileMenu} className="open">
                        <div className="row">
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                        </div>
                        <div className="row">
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                        </div>
                    </div>
                    <div onClick={this.closeMobileMenu} className="cross">
                        <div className="cross1">
                        </div>
                        <div className="cross2">
                        </div>
                    </div>
                </div>


                <div className="mmenu">
                    <ul>
                        <li ><Link onClick={this.headerNav} to="/" className="active">Home</Link></li>
                        <li><Link onClick={this.headerNav} to="/#about">About</Link></li>
                        <li><Link onClick={this.headerNav} to="/#portfolio">Portfolio</Link></li>
                        <li><Link onClick={this.headerNav} to="/#contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
            {/* <Switch>
                <Header/>
                <Route path="/portfolios">
                <Portfolios/>
                </Route>
                <Footer/>
            </Switch> */}
        </Router>
        )
    }
}
export default Header;