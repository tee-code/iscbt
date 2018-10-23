import React, { Component } from "react"
import Header from '../Header'
import Footer from '../Footer'
import '../Home/Home.css'
import '../Register/Register.css'
import Welcome from '../Welcome'
import { Link, Redirect } from 'react-router-dom'

class ExamEnded extends Component{
  constructor(props){
    super(props)
    this.state = {
      companyName: "",
      companyAddr: "",
      term: "",
      teacher: "",
      timeAllocated: "",
      questionNo: 0,
      className: "",
      examCode: 3030,
      subject: "",
      redirect: false
    }
    this.logout = this.logout.bind(this)
  }
  componentDidMount() {
    if(sessionStorage.getItem("sesscode") && localStorage.getItem("schoolData") && localStorage.getItem("examDetails")){
      const student = JSON.parse(sessionStorage.getItem("sesscode"))
      const schoolData = JSON.parse(localStorage.getItem("schoolData"))
      const examDetails = JSON.parse(localStorage.getItem("examDetails"))

      //update the state
      this.setState({
        companyName: schoolData.schname,
        companyAddr: schoolData.schaddr,
        term: examDetails.term,
        teacher: examDetails.teacher,
        timeAllocated: examDetails.timed + "minutes",
        questionNo: examDetails.no_of_questions,
        className: examDetails.thisclass,
        examCode: examDetails.testcode,
        subject: examDetails.subject_name
      })
    }else{
      this.setState({redirect:true})
      console.log("cannot get data")
    }
  }
  /*
    whent the logut button is clicked
    it removed all the student details from the storage API
    it removed all the exam details from the storage API
  */

  logout = () => {
    //remove exam details from the localStorage API
    localStorage.removeItem("examDetails")
    //remove sesscode details form the sessionStorage API
    sessionStorage.removeItem("sesscode")
    //remove examID from the sessionStorage API
    sessionStorage.removeItem("examID")

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
          <table style = {{background: "#003366"}} className = "table table-bordered">
            <thead>
              <tr>
                <th colSpan = "2" scope = "col">You just finished an exam with testcode as {this.state.examCode}, other information about this exam is listed below;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Term</td>
                <td>{this.state.term}</td>
              </tr>
              <tr>
                <td>Teacher</td>
                <td>{this.state.teacher}</td>
              </tr>
              <tr>
                <td>Subject</td>
                <td>{this.state.subject}</td>
              </tr>
              <tr>
                <td>Time allocated</td>
                <td>{this.state.timeAllocated}</td>
              </tr>
              <tr>
                <td>Class</td>
                <td>{this.state.className}</td>
              </tr>
              <tr>
                <td>No of getQuestions</td>
                <td>{this.state.questionNo}</td>
              </tr>
              <tr>
                <td>Exam Code</td>
                <td>{this.state.examCode}</td>
              </tr>
            </tbody>
          </table>
          <i style = {{color: "red",fontWeight:"bolder",fontFamily:"cursive"}}>You can now logout</i>
          <br/>
          <Link to = {"/iscbt/login"}><button type = "button" className = "btn my-btn" onClick = {this.logout}>Logout</button></Link>
        </div>
        <Footer companyName = {this.state.companyName} companyAddr = {this.state.companyAddr}/>
      </div>
    )
  }
}
export default ExamEnded
