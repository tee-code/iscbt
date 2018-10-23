import React, { Component } from "react"
import "./Register.css"
import Header from '../Header'
import Footer from '../Footer'
import '../Home/Home.css'
import Welcome from '../Welcome'
import { Link, Redirect } from 'react-router-dom'

export class Register extends Component{
  constructor(props){
    super(props)
    this.state = {
      companyName: "",
      companyAddr: "",
      studentName: "",
      className: "",
      redirect: false,
      error: false,
      sesscode: "",
      admno: "",
      userExamCode: "",
      writeExam: false,
      errorMessage: ""
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    if(sessionStorage.getItem("sesscode") && localStorage.getItem("schoolData")){
      const responseJSON = JSON.parse(localStorage.getItem("schoolData"))
      this.setState({companyName: responseJSON.schname, companyAddr:responseJSON.schaddr})
      const studentDetails = JSON.parse(sessionStorage.getItem("sesscode"))
      this.setState({
        companyName: responseJSON.schname,
        companyAddr: responseJSON.schaddr,
        studentName: studentDetails.name,
        className: studentDetails.class,
        sesscode: studentDetails.sesscode,
        admno: studentDetails.admno
      })

    }else{
      this.setState({redirect:true})
      console.log("cannot get data")
    }
  }

  onSubmit = ()=>{
    // Request post parameters
    const checktcode = true
    const scode = this.state.sesscode
    const admno = this.state.admno
    const tcode = this.state.userExamCode

    const request = new XMLHttpRequest()
    request.open("POST","https://isc.obounce.net/api.php")
    request.onreadystatechange = ()=>{
      if(request.readyState === 4 && request.status === 200){
        const responseJSON = JSON.parse(request.response)
        if(!responseJSON.status){
          this.setState({error:true,errorMessage:responseJSON.error})
        }else{
          responseJSON.questions = ["you cannot view this"]
          localStorage.setItem("examDetails",JSON.stringify(responseJSON))
          sessionStorage.setItem("examID",responseJSON.exam_id)
          this.setState({writeExam:true})
        }
      }
    }
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    request.send(`checktcode=${checktcode}&sesscode=${scode}&admno=${admno}&testcode=${tcode}`)
  }
  onChange = (event)=>{
    this.setState({userExamCode: event.target.value})
  }
  render(){
    if(this.state.redirect){
      return(<Redirect to = {"/iscbt/login"} />)
    }
    if(this.state.writeExam){
      return(<Redirect to = {"/iscbt/intro"} />)
    }
    return(
      <div className = "container-fluid">
        <Header companyName = {this.state.companyName} linkName = "Logout | "/>
        <div className="jumbotron Main">
          <Welcome state = {this.state} />
          <form>
            <div className = "form-group container-fluid">
              <label className = "form-label label-bg">Provide Exam Code below</label>
              <div className = "form-park">
              {
                this.state.error
                &&
                <div className = "my-btn error">{this.state.errorMessage}</div>
              }
                <input className = "form-control validate" name = "examCode" type = "text" placeholder = "e.g. 4000" onChange = {this.onChange} required ={true}/>
                <button type = "button" className = "btn btn-block my-btn" onClick = {this.onSubmit}>Submit</button>
              </div>
            </div>
          </form>
        </div>
        <Footer companyName = {this.state.companyName} companyAddr = {this.state.companyAddr}/>
      </div>
    )
  }
}
export default Register
