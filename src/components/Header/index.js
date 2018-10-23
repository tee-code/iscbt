import React, { Component } from 'react'
import logo from '../../logo.svg';
import Login from '../Login'
import './Header.css'
import { Link, Redirect } from 'react-router-dom'

class Header extends Component{
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.logout = this.logout.bind(this)
  }
  logout = () => {
    //remove exam details from the localStorage API
    localStorage.removeItem("examDetails")
    //remove sesscode details form the sessionStorage API
    sessionStorage.removeItem("sesscode")
    //remove examID from the sessionStorage API
    sessionStorage.removeItem("examID")
    //remove result from the sessionStorage API
    sessionStorage.removeItem("resultData")
  }
  render(){
    return (
        <header className="App-header container-fluid">
          <div className = "row">
            <div className = "col-sm">
              <Link to = {"/"}>
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-name">ISCBT | {this.props.companyName}</h1>
              </Link>
              <Link to = {"/iscbt/home"}><p className = "display-6" style = {{float:"right",color:"#f44259"}}>&nbsp; Home</p></Link>
              <Link to = {"/iscbt/login"}><p className = "display-6" style = {{float:"right",color:"#f44259",cursor:"pointer"}} onClick = {this.logout}>{this.props.linkName}</p></Link>
            </div>
          </div>
        </header>
    )
  }
}

export default Header
