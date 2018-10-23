import React, { Component } from "react"
import Header from '../Header'
import Footer from '../Footer'
import '../Home/Home.css'
import '../Register/Register.css'
import Welcome from '../Welcome'
import { Link, Redirect } from 'react-router-dom'

class Intro extends Component{
  constructor(props){
    super(props)
    this.state = {
      companyName: "",
      term: "",
      teacher: "",
      timeAllocated: "",
      questionNo: 5,
      className: "",
      examCode: 3030,
      subject: "",
      redirect: false,
      examID: 0
    }
  }

  componentDidMount() {
    if(sessionStorage.getItem("sesscode") && localStorage.getItem("examDetails")){
      const resultJSON = JSON.parse(localStorage.getItem("examDetails"))
      const companyDetails = JSON.parse(localStorage.getItem("schoolData"))

      this.setState({
        companyName: companyDetails.schname,
        term: resultJSON.term,
        teacher: resultJSON.teacher,
        timeAllocated: resultJSON.timed + " minutes",
        questionNo: resultJSON.no_of_questions,
        className: resultJSON.thisclass,
        examCode: resultJSON.testcode,
        subject: resultJSON.subject_name,
        companyAddr: companyDetails.schaddr,
        examID: resultJSON.exam_id
      })
    }else{
      this.setState({redirect:true})
      console.log("cannot get data")
    }
  }
  submitExamID = ()=>{
    sessionStorage.setItem("examID",this.state.examID)
  }
  render(){
    if(this.state.redirect){
      return(
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
                <th colSpan = "2" scope = "col">Kindly confirm your details</th>
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
          <Link to = {`/iscbt/exam`}><button type = "button" className = "btn my-btn" onClick = {this.submitExamID}>Start Exam</button></Link>
        </div>
        <Footer companyName = {this.state.companyName} companyAddr = {this.state.companyAddr}/>
      </div>
    )
  }
}
export default Intro
