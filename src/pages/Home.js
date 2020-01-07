import React from 'react';
import api from 'axios';

import home1 from '../img/home1.png';
import about from '../img/about.png';
import portfolio10 from '../img/portfolio10.png';
import portfolio2 from '../img/portfolio2.png';




class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            ///category:[],
            slider:[],
            slideCount:1,
            time:0,
            openVideoModal:false,
            video:false,
            videoUrl:'' //put the video link here
        }
        // let count = 0;
        // let time;
        // let firstClick = true;
        // let firstClickPrev = true;
    }
    
    componentDidMount(){

        const media = document.querySelector('.media');
        const countDom = document.querySelector('.count');
        const hitems = document.querySelectorAll('.hitems');
        countDom.lastChild.innerText = '0'+ (hitems.length);
        this.autoSlide();
        this.videoContent()
        const url = 'http://localhost/ephraim/';
        //const car = []
        this.setState({loading:true},()=>{
                    //categories
        //     console.log(this.state.categories)
            api.get(`${url}/wp-json/wp/v2/posts`)
            .then(res=>{
                this.setState({loading:false, slider:res.data});
                
            })
            .catch(error=>this.setState({loading:false,err:error.response.data}))
        })

    }

    //video content

    videoContent =()=>{
        if(this.state.videoUrl !== ''){
            this.setState({video:true})
        }else{
            this.setState({video:false})
        }
    }

    //video
    videoModal =()=>{
        const video = document.querySelector('.media-video')
        if(!this.state.openVideoModal){
            video.style.transform =
            'translateY(0)';
            this.setState({openVideoModal:true})
        }else{
            video.style.transform =
            'translateY(-150%)';
            this.setState({openVideoModal:false})
        }

        
    }
    //sliderShow

    sliderShow = slide =>{
        const countDom = document.querySelector('.count');
        const hitems = document.querySelectorAll('.hitems');
        let slideIndex = Number(slide);
        if(slideIndex <= 0)
            slideIndex = hitems.length;
        else if(slideIndex > hitems.length)
            slideIndex = 1
            document.querySelector('.slide-'+slideIndex).style.transform = 'translateX(-100%)';
        this.setState({slideCount:slideIndex})
        for(let i = 0; i < hitems.length; i++){
            hitems[i].classList.remove('slider')
        }
            countDom.firstElementChild.innerText = '0'+ (slideIndex);
            document.querySelector('.slide-'+slideIndex).classList.add('slider')
            document.querySelector('.slide-'+slideIndex).style.transition = 'all 200ms ease-in-out';
           
                document.querySelector('.slide-'+slideIndex).style.transform = 'translateX(0)';
       
    
    }
    //auto slide

    autoSlide =()=>{
        const hitems = document.querySelectorAll('.hitems');
       let time =  setInterval(()=>{
           let slideIndex = this.state.slideCount+1;
           if(slideIndex > hitems.length)
            slideIndex = 1;
            this.sliderShow(slideIndex)
            this.setState({slideCount:slideIndex})

        },5000)
        this.setState({time:time})
    }

    onHover =()=>{
            clearInterval(this.state.time)
    }

    prevSlide = ()=>{
        this.sliderShow(Number(this.state.slideCount - 1))
    }
    nextSlide = ()=>{
        this.sliderShow(Number(this.state.slideCount + 1))
    }

    render(){
        const sliders = this.state.slider;
        return(
            <section>
                <div id="home" className="home">
                <div className="hitems slide-1  slider" style={{ backgroundImage: `url(${home1})` }}></div>
                <div className="hitems slide-2" style={{ backgroundImage: `url(${portfolio10})` }}></div>
                <div className="hitems slide-3" style={{ backgroundImage: `url(${about})` }}></div>
                <div className="hitems slide-4" style={{ backgroundImage: `url(${portfolio2})` }}></div>
           
                   
           
                <div className="overlay"></div>
                <div className="inner-middle">
                    <div className="count">
                        <span>01</span>
                        <span></span>
                        <span>05</span>
                    </div>
                    <div className="slide">
                        <span onClick={this.prevSlide} onMouseEnter={this.onHover} onMouseOut={this.autoSlide} className="prev"></span>
                        <span onClick={this.nextSlide} onMouseEnter={this.onHover} onMouseOut={this.autoSlide} className="next"></span>
                    </div>
                    <div className="button">
                        <a href="#portfolio">see portfolio</a>
                    </div>
                </div>
            </div>
            <div className="inner-bottom">
                <div className="text">
                    <p>
                        Every moment captured,is worth being perfectly. With gathered years of experience I have come to know that it's not just about having the experience, it's using it. All me to use my professional skill and expreince to capture you moments perfectly
                    </p>
                </div>
                <div>
                    <div className="video">
                        <div onClick={this.videoModal} className="play">
                            <div className="angle"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="media-video">
                <span className="close v-close"><a onClick={this.videoModal} href="#">&times;</a></span>
                <div className="inner-vid">
                    {this.state.video?(
                         <iframe 
                         width="100%" 
                         height="100%" 
                         src={this.state.videoUrl} 
                         frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; 
                         picture-in-picture" allowfullscreen>
                       </iframe>
                    ):(
                        <p>No video is currently available..</p>
                    )}
                </div>
            </div>
            </section>
        )
    }
}
export default Home;