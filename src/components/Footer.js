import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";


class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state ={
          currentTheme:'light',
          position: 'start',
          themes:{
            light:{
             'background-color': '#fff',
             'primary-color': '#FFB60A',
             'title-color':'#C40000',
             'main-color':'#fff',
             'main-shadow': '#00000029',
             'links-color':'#15C2DE',
             'main-overlay':'rgba(0,0,0,0.7)',
             'secondary-text-color':'#000000',
             'input-border':'#919191',
             'portfolio-nav':'#434343',
             'footer-theme':'#065764',
             'footer-border-color':'#000808',
             'slide-background':'#E8E8E8',
             'knob-color':'#15C2DE'
            },
            dark:{
              'background-color':'#010814',
              'main-color':'#fff',
              'portfolio-nav':'#fff',
              'secondary-text-color':'#fff',
              'title-color':'#FFB60A',
              'button-text-color':'#000000',
              'footer-border-color':'#fff',
              'footer-theme':'#fff',
              'slide-background':'#15C2DE',
              'knob-color':'#fff'
            }
          }
        }
      }

      componentDidMount(){
       
       const switchSlide = document.querySelector('.theme-slide');
       const theme = localStorage.getItem('theme');
       if(theme != null){
        switchSlide.style.justifyContent= 'end'
        this.setState({
            currentTheme:'light', position: 'start'})
        this.setTheme('dark')
        document.querySelector('.icon-g-dark').style.opacity='1';
        document.querySelector('.icon-g-light2').style.opacity='0.33';
       }else{
        this.setTheme('light')
        switchSlide.style.justifyContent= 'start'
        this.setState({
         currentTheme:'dark', position: 'end'})
         document.querySelector('.icon-g-dark').style.opacity='0.33';
         document.querySelector('.icon-g-light2').style.opacity='1';
       }


      }
    //   componentDidUpdate(prevProps, prevState){
    //     if(this.state.currentTheme !== this.prevState.currentTheme){
    //       this.setTheme()
    //     }
    //   }
      
      setTheme = (currentTheme)=>{
        const theme = this.state.themes[currentTheme];
          Object.keys(theme).forEach((key)=>{
            const cssKey = `--${key}`;
            const cssValue = theme[key];
            //document.getElementsByTagName('html')[0].style.setProperty(cssKey,cssValue)
            document.body.style.setProperty(cssKey, cssValue);
          })
      }
      
      toggleTheme = ()=>{
        const switchSlide = document.querySelector('.theme-slide');
        if(this.state.position === 'start'){
            localStorage.removeItem('theme');
            this.setTheme(this.state.currentTheme)
          switchSlide.style.justifyContent= this.state.position;
          this.setState({
            currentTheme:'dark', position: 'end'})
            document.querySelector('.icon-g-dark').style.opacity='0.33';
            document.querySelector('.icon-g-light2').style.opacity='1';
        }else{
          localStorage.setItem('theme','dark');
          switchSlide.style.justifyContent= 'start';
          this.setTheme(this.state.currentTheme)
          switchSlide.style.justifyContent= this.state.position;
          this.setState({
            currentTheme:'light',
            position:'start'
          })
          document.querySelector('.icon-g-dark').style.opacity='1';
          document.querySelector('.icon-g-light2').style.opacity='0.33';
        }
      }
    render(){

        return (
            <div>
                <h2>THE GYFT PHOTOGRAPHY</h2>
                <div className="items">
                    <div className="inner">
                        <div className="row">
                            <ul>
                                <Router>
                                  <li><Link to="/wedding">Wedding</Link></li>
                                  <li><Link to="/portrait">Portrait</Link></li>
                                  <li><Link to="/fashion">Fashion</Link></li>
                                  <li><Link to="/art">Art</Link></li>
                                </Router>
                            </ul>
                        </div>
                        <div className="row">
                          <div className="theme">
                            <div className="nepa">
                                <div>
                                    <p>Theme Mode</p>
                                </div>
                                <span><span className="icon-g-light2"><span className="path1"></span><span className="path2"></span></span></span>
                                <div onClick={this.toggleTheme} className="slide theme-slide">
                                    <div onClick={this.toggleTheme} className="switch"></div>
                                </div>
                                <span><i className="icon-g-dark"></i></span>
                            </div>
                          </div>
                            <ul>
                                <li><a href="https://www.facebook.com"><i className="icon-g-fb"></i></a></li>
                                <li><a href="https://www.instagram.com"><i className="icon-g-insta"></i></a></li>
                                <li><a href="https://www.twitter.com"><i className="icon-g-twitter"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p>&copy; Gyftography {new Date().getFullYear()}| Designed By AIBTECH</p>
            </div>
        )
    }
}
export default Footer;