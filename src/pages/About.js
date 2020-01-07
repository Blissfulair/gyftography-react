import React from 'react';

class About extends React.Component{
    render(){
        return (
            <div>
                <h2>About Me</h2>
                <div className="row">
                    <div className="col">
                        <div className="img"></div>
                        <div className="text">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="main-pic"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;