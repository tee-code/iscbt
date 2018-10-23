import React, { Component } from "react"
import Header from '../Header'
import Footer from '../Footer'
import './Home.css'
import Welcome from '../Welcome'
import { Link, Redirect } from "react-router-dom"

class Home extends Component{
  state = {
    companyName: "",
    companyAddr: "",
    studentName: "",
    className: "",
    redirect: false
  }

  componentWillMount() {
    if(sessionStorage.getItem("sesscode") && localStorage.getItem("schoolData")){
      const responseJSON = JSON.parse(localStorage.getItem("schoolData"))
      const studentDetails = JSON.parse(sessionStorage.getItem("sesscode"))
      this.setState({
        companyName: responseJSON.schname,
        companyAddr: responseJSON.schaddr,
        studentName: studentDetails.name,
        className: studentDetails.class
      })
    }else{
      this.setState({redirect:true})
    }
  }
  render(){

    if(this.state.redirect){
      return (
        <Redirect to = {"/iscbt/login"} />
      )
    }
    return(
      <div className = "container-fluid">
        <Header companyName = {this.state.companyName} linkName = "Logout | "/>
        <div className="jumbotron Main">
          <Welcome state = {this.state} />
            <div>
              <p>Kindly pick a task below:-</p>
              <p className="lead">
                <Link to = {"/iscbt/register"}><button className="btn btn-primary btn-lg exam-btn">Take Exam</button></Link>
                <Link to = {"/iscbt/result"}><button className="btn btn-primary btn-lg result-btn">Check Result</button></Link>
              </p>
            </div>
        </div>
        <Footer companyName = {this.state.companyName} companyAddr = {this.state.companyAddr}/>
      </div>
    )
  }
}
export default Home
