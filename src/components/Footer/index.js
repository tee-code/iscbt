import React, { Component } from "react"
import './Footer.css'

class Footer extends Component{

  today = new Date();
  render(){
    return(
      <footer className = "container-fluid Footer-pack bg-red">
        <p>© {this.props.companyName} | Internal School CBT {this.today.getFullYear()}</p>
        <p>Address: {this.props.companyAddr} </p>
      </footer>
    )
  }
}
export default Footer
