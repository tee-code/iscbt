import React, { Component } from "react"
import "../Home/Home.css"

class Welcome extends Component{
  render(){
    return (
      <div>
        <div className = "rounded-box"><span className = "display-3">W</span>elcome</div>
        <h1 className="display-4">{this.props.state.studentName}</h1>
        <p className="lead">You have registered as a {this.props.state.className} student at {this.props.state.companyName} with no known issue.</p>
        <hr className="my-4" />
       </div>
    )
  }
}




export default Welcome
