import React from 'react';

import gmail from '../img/gmail.png';
import phone from '../img/phone.png';
import location from '../img/location.png';

class Contact extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            email:'',
            message:'',
            err:''
        }
    }

    changeHandler=(e)=>{
        const name = e.target.name;
        let err =''
        if(name === '')
        err = name+" must not be empty";
        this.setState({[name]:e.target.value, err:err})
    }
    onSubmit=(e)=>{
        e.preventDefault();
        // console.log(this.state)
        if(this.state.name === '')
            this.setState({err:'Name is required'});
        else if(this.state.email === '')
            this.setState({err:'Your email is required'});
        else if(this.state.message === '')
            this.setState({err:'Message cannot be empty'});
        else{
            this.setState({name:'',email:'',message:'',err:''})
            e.target.reset();
            alert('Thank you for contacting me. I will respond within the next 24hrs')
        }
    }
    render(){
        return(
            <div>
                <h2>CONTACT</h2>
                <div className="row">
                    <div className="col">
                        <p>You can contact me using the form below</p>
                        <form onSubmit={this.onSubmit}>
                            <p className="error">{this.state.err}</p>
                            <div className="form-group">
                                <label htmlFor="name">Your Full name</label>
                                <input name="name" onChange={this.changeHandler} className="form-control" id="name" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your email address</label>
                                <input name="email" onChange={this.changeHandler} className="form-control" id="email" type="text" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Your message to me</label>
                                <textarea name="message" onChange={this.changeHandler} id="message" className="form-control" cols="30" rows="1"/>
                            </div>
                            <div className="form-group">
                                <button type="submit">Send message</button>
                            </div>
                        </form>
                    </div>
                    <div className="col">
                        <ul>
                            <li><img src={gmail} alt="" /><a href="mailto:bookingswithgyft@gmail.com">bookingswithgyft@gmail.com</a></li>
                            <li><img src={phone} alt="" /> +234 81 4155 6242, +234 81 5173 6887</li>
                            <li><img src={location} alt="" /> Givitec Complex, 192 M.M Way, Third East Circular, Opp. Mama Miracle store.</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Contact;