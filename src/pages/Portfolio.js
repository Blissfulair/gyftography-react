import React from 'react';
import axios from 'axios';

import portfolio from '../img/about.png';



class Portfolio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            portfolios:[],
            err:'',
            slideIndex:0,
            menuItem:'all',
            modalOpen:false,
            categories:[]
        }
        // let count = 0;
        // let time;
        // let firstClick = true;
        // let firstClickPrev = true;
    }
componentDidMount(){

    const url = 'http://localhost/ephraim/';
    const car = []
    this.setState({loading:true},()=>{
        axios.get(`${url}/wp-json/wp/v2/posts/?_embed&per_page=`+12)
        .then(res=>{
            this.setState({loading:false,portfolios:res.data})
        })
        .catch(error=>this.setState({loading:false,err:error.response.data}))

        //categories
        axios.get(`${url}/wp-json/wp/v2/categories`)
        .then(res=>{
            
            res.data.map(val=>{
                return car[val.id]=val.name
            })
            this.setState({loading:false,categories:car})
        })
        .catch(error=>this.setState({loading:false,err:error.response.data}))
    })
}

//portfolio nav item active
nav = (e)=>{
    
    e.preventDefault()
    this.setState({menuItem:e.target.dataset['slide']})
    const menuList = e.target.parentElement.parentElement.children;
    for(let i = 0; i < menuList.length; i++){
        menuList[i].firstElementChild.removeAttribute('class')
    }
    e.target.parentElement.firstElementChild.classList.add('active')
    let portfolio = document.querySelectorAll('.all')
    let number = (document.querySelectorAll('.'+e.target.dataset['slide']).length >0)?document.querySelectorAll('.'+e.target.dataset['slide']).length:12;
    let count = 0;
    for(let i = 0; i < portfolio.length; i++){
        portfolio[i].classList
        .remove('item2','item1','item3','item4','p-1','p-2','p-3','p-4','p-5','p-6','p-7','p-8','p-9','p-10','p-11','p-12')
        let items = portfolio[i].className.split(' ').filter((event)=>event === e.target.dataset['slide'])
        if(items[0] !== e.target.dataset['slide'])
        portfolio[i].style.display = 'none';
        else
        {
            ++count;
            portfolio[i].style.display = 'block';
            
            if(number > 4 && count === 2){
                portfolio[i].classList.add('item2')
            }else if(number > 7 && count === 5){
                portfolio[i].classList.add('item1')
            }else if(number > 8 && count === 6){
                portfolio[i].classList.add('item3')
            }else if(number === 12 && count === 12){
                portfolio[i].classList.add('item4')
            }  
            portfolio[i].classList.add('p-'+count)        
        }      
        
    }
}
modalClose = (e)=>{
    if(this.state.modalOpen){
        e.preventDefault();
        this.setState({modalOpen:false})
        const media = document.querySelector('.media');
        media.classList.remove('display')
        media.classList.add('no-display')
    }
}
showPortfolio = (n)=>{
            this.setState({modalOpen:true})
            const portfolios = document.querySelectorAll('.'+this.state.menuItem);
            const slideIndex = Number(n);
            if(slideIndex <= 0)
            return
            else if(slideIndex > portfolios.length)
            return
            const media = document.querySelector('.media');
            media.firstElementChild.children[1].style.backgroundImage = document.querySelector('.p-'+slideIndex).style.backgroundImage;
            media.firstElementChild.style.display = 'grid';
            media.classList.remove('no-display')
            media.classList.add('display')
            this.setState({slideIndex: slideIndex})
}
prev =()=>{
    this.showPortfolio(this.state.slideIndex - 1)
}
next =()=>{
    this.showPortfolio(this.state.slideIndex + 1)
}
    render(){
        const {portfolios} = this.state;
        let i = 0;
        
        const portfolioDom = (
                <div>
                    <h2>PORTFOLIO</h2>
                    <div className="nav">
                        <ul>
                            <li><a onClick={this.nav} data-slide="all" className="active" href="#">All</a></li>
                            <li><a onClick={this.nav} data-slide="wedding" href="#">Wedding</a></li>
                            <li><a onClick={this.nav} data-slide="portrait" href="#">Portrait</a></li>
                            <li><a onClick={this.nav} data-slide="fashion" href="#">Fashion</a></li>
                            <li><a onClick={this.nav} data-slide="art" href="#">Art</a></li>
                        </ul>
                    </div>
                    {portfolios.length ? (
                        <div className="row">
                            {portfolios.map(portfolio=>{
                                ++i
                                let name ='col all '+this.state.categories[portfolio.categories[0]].toLowerCase();
                                
                                if(portfolio.categories.length > 1){
                                    for(let j = 1; j < portfolio.categories.length; j++){
                                        name += ' '+this.state.categories[portfolio.categories[j]].toLowerCase()
                                    }
                                }
                                switch(i){
                                    case 2:
                                    name += ' item2';
                                    break;
                                    case 5:
                                    name += ' item1';
                                    break;
                                    case 6:
                                    name += ' item3';
                                    break;
                                    case 12:
                                    name += ' item4';
                                    break;
                                    default:
                                    name += '';
                                    break;

                                }
                                name +=' p-'+i;
                                if(portfolio._embedded['wp:featuredmedia']){
                                    return  <div onClick={(ev)=>{this.showPortfolio(ev.target.classList[ev.target.classList.length -1].split('-')[1])}} key={portfolio.id} className={name} style={{ backgroundImage: `url(${portfolio._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url})` }}></div>
                                }
                                return '';

                            })}
                        </div>
                    ):''}
                    <div className="button">
                        <a href="#">SEE ALL CAPTURED MEMORIES</a>
                    </div>
                </div>
        )
        return (
            <div>
                {this.state.loading?(
                    <div className="row">
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col item2" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col item1" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col item3" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col" style={{ backgroundImage: `url(${portfolio})` }}></div>
                        <div className="col item4" style={{ backgroundImage: `url(${portfolio})` }}></div>
                    </div>
                ):(
                    portfolioDom
                )}
                <div className="media no-display">
                    <div className="inner-media">
                        <div onClick={this.prev} id="prev"></div>
                        <div className="img">
                            <span className="close"><a onClick={this.modalClose} href="#">&times;</a></span>
                        </div>
                        <div onClick={this.next} id="next"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Portfolio;