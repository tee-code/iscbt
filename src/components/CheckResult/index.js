import React, { Component } from "react"
import Header from '../Header'
import Footer from '../Footer'
import '../Home/Home.css'
import '../Register/Register.css'
import Welcome from '../Welcome'
import { Link, Redirect } from 'react-router-dom'

class CheckResult extends Component{
  constructor(props){
    super(props)
    this.state = {
      companyName: "",
      studentName: "",
      className: "",
      sessions: [],
      terms: [],
      redirect: false
    }

    this.checkAvailability = this.checkAvailability.bind(this)
  }

  componentDidMount() {
    if(sessionStorage.getItem("sesscode") && localStorage.getItem("schoolData")){
      //get data from the localStorage API and store it as JSON data
      const responseJSON = JSON.parse(localStorage.getItem("schoolData"))
      //update the state
      this.setState({
        companyName: responseJSON.schname,
        companyAddr: responseJSON.schaddr,
      })
      //call checkAvailability method
      this.checkAvailability()
    }else{
      this.setState({redirect:true})
      console.log("cannot get data")
    }
  }

  checkAvailability = ()=>{
    //get student data from the sessionStorage API
    const responseJSON = JSON.parse(sessionStorage.getItem("sesscode"))
    const getress = responseJSON.status;
    const admno = responseJSON.admno;
    const request = new XMLHttpRequest()
    request.open("POST","https://isc.obounce.net/api.php",true)

    request.onreadystatechange = ()=>{
      if(request.readyState === 4 && request.status === 200){
        //get the response and convert it to JSON data
        const responseJSON = JSON.parse(request.response)
        //check if successful
        if(responseJSON.status){
          //update the state
          this.setState({
            terms: responseJSON.terms,
            sessions: responseJSON.years
          })
          sessionStorage.setItem("resultData",JSON.stringify(responseJSON))
        }
      }
    }

    request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    request.send(`getress=${getress}&admno=${admno}`)
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
          <form>
            <div className = "form-group container-fluid">
              <label className = "form-label label-bg">Provide Reg. Code</label>
              <div className = "form-park">
              <select className="custom-select">
                <option value = "1" defaultValue>{this.state.sessions[0]}</option>
                {
                  this.state.sessions.forEach((data,index)=>{
                    return <option value="{index+2}">{data}</option>
                  })
                }
              </select>
              <select className="custom-select">
                <option value = "1" defaultValue>{this.state.terms[0]}</option>
                {
                  this.state.terms.forEach((data,index)=>{
                    return <option value="{index+2}">{data}</option>
                  })
                }

              </select>
                <Link to = {"/iscbt/result"}><button type = "button" className = "btn btn-block my-btn">Submit</button></Link>
              </div>
            </div>
          </form>
        </div>
        <Footer companyName = {this.state.companyName} companyAddr = {this.state.companyAddr}/>
      </div>
    )
  }
}
export default CheckResult
