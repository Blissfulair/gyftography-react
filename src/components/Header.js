import React from 'react';

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
                elements[i].firstElementChild.classList.remove('active')
                var element = document.getElementById(nav);
                if(element != null && elementInViewPort(element)){
                    lastNav = nav
                    document.querySelector('[href="#'+nav+'"]').classList.add('active')
                }else{
                    document.querySelector('[href="#'+lastNav+'"]').classList.add('active')
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
            menuList[i].firstElementChild.removeAttribute('class')
        }
        e.target.parentElement.firstElementChild.classList.add('active')
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
            <div className="inner-header">
                <div className="header">
                    <ul className="menu">
                        <li ><a onClick={this.headerNav} href="#home" className="active">Home</a></li>
                        <li><a onClick={this.headerNav} href="#about">About</a></li>
                        <li><a onClick={this.headerNav} href="#portfolio">Portfolio</a></li>
                        <li><a onClick={this.headerNav} href="#contact">Contact</a></li>
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
                    <li><a data-href="#home" href="#home">Home</a></li>
                    <li><a data-href="#portfolio" href="#portfolio">Portfolio</a></li>
                    <li><a data-href="#about" href="#about">About</a></li>
                    <li><a data-href="#contact" href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default Header;