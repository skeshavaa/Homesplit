import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
        <div className = "dashboard container section finances overall">
            <div className="card z-depth-0">
                <div className="about-title card-title">
                    <h1>Welcome to HomeSplit!</h1>
                </div>
                <div className="about-content card-content">
                    <p>
                    Hi! Welcome to HomeSplit! This is an application
                    created by Keshavaa Shaiskandan and is my first 
                    React Web application. I started this side project
                    when I was in the first year of my computer science
                    undergraduate program at the University of Toronto.
                    <br></br><br></br>
                    A few of my friends who were going to stay on res of
                    the university of their choice were trying to come up
                    with the best way to split costs amongst each other and
                    their other roomates. This is when I had the idea to create
                    this web application.
                    <br></br><br></br>
                    It is simple and easy to use. Simply sign up with your email,
                    name and a joinlink. The joinlink can be anything of your choosing
                    as long as it has already not been taken. Your other roomates can then
                    sign up with their emails and the joinlink you created and you can be added
                    to the same group! Simply click "Add Entry" to log a cost in the application.
                    HomeSplit will automatically update everyone's dashboard with your entry and 
                    split the cost you logged among all your roomates. Your finances are viewable
                    on the "Finances" page where you can see how much you owe certain roomates and 
                    how much they owe you!
                    <br></br><br></br>
                    If you accidentally joined someone else's group by using the wrong joinlink,
                    simply delete your account on the settings page and signup again using the correct
                    joinlink!
                    <br></br><br></br>
                    Have fun using my first React web application. Play around with and 
                    it and I hope it makes splitting costs with your roomates easier!
                    </p>
                </div>
            </div>
        </div>
            
        )
    }
}

export default About
