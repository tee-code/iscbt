import React, { Component } from "react"
import { Link, Redirect } from "react-router-dom"
import Header from "../Header"
import Footer from "../Footer"
import "./Exam.css"
import { Register } from '../Register'
require("bootstrap-less/bootstrap/bootstrap.less");

class Exam extends Component{
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
      subject: "",
      examCode: 3030,
      questions: [{
        a: "",
        b: "",
        c: "",
        d: "",
        e: "",
        ansoption: "",
        instruction: "",
      }],
      answers: [],
      currentIndex: 0,
      hours: 0,
      minutes: 0,
      second: 1,
      fetched: false,
      examReady: false,
      redirect: false,
      submitted: false
    }

    this.eachQuestion = this.eachQuestion.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.fetchQuestions = this.fetchQuestions.bind(this)
    this.onChecked = this.onChecked.bind(this)
    this.calculate = this.calculate.bind(this)
    this.submitOnBehalf = this.submitOnBehalf.bind(this)
  }

  componentWillMount() {

    console.log("message from componentWillMount: "+this.state.questions)
    //check if examID is in the sessionStorage API, if yes update the state that exam is ready to start
    if(sessionStorage.getItem("examID")){
      this.setState({examReady:true})
    }

    /*
      check if the sesscode is in the sessionStorage API
      and examDetails is in the localStorage API
      if yes, get both sesscode and examDetails
      and update the state
    */
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
        minutes: parseInt(resultJSON.timed),
      })
    }

    //check if sesscode is not available in the sessionStorage API and redirect back to login page
    if(!sessionStorage.getItem("sesscode")){
      this.setState({redirect:true})
    }

    //the timer function
    const countDown = setInterval(()=>{
      if(this.state.minutes >= 60){
        this.setState({
          hours: parseInt(this.state.minutes / 60),
          minutes: this.state.minutes % 60
        })
      }
      if(this.state.second >= 60){
        if(this.state.minutes <= 0){
          this.setState({
            hours: this.state.hours - 1,
            minutes: 60 + this.state.minutes
          })
        }
        this.setState({
          minutes: this.state.minutes -= 1,
          second: 0
        })
      }else{
        this.setState({
          second:this.state.second += 1
        })
      }
    },1000)
  }

  //fuction that determine and dispay a particular question of the number pressed
  eachQuestion = (event)=>{
    this.setState({
      currentIndex:event.target.textContent-1,
    })
  }

  //function that determine the next question in the database
  next = ()=>{
    if(this.state.currentIndex < this.state.questionNo-1){
      this.setState({
        currentIndex: this.state.currentIndex += 1
      })
    }else{
      this.setState({
        currentIndex: this.state.currentIndex
      })
    }
  }

  //function that determine the previous question in the database
  prev = ()=>{
    if(this.state.currentIndex >= 1){
      this.setState({
        currentIndex: this.state.currentIndex -= 1
      })
    }else{
      this.setState({
        currentIndex: this.state.currentIndex
      })
    }
  }

  fetchQuestions = ()=> {
    //fetch sesscode data from session storage api
    if(sessionStorage.getItem("sesscode") && localStorage.getItem("examDetails")){
      const responseJSON = JSON.parse(sessionStorage.getItem("sesscode"))
      const resultJSON = JSON.parse(localStorage.getItem("examDetails"))
      // Request post parameters
      const checktcode = true
      const scode = responseJSON.sesscode
      const admno = responseJSON.admno
      const tcode = resultJSON.testcode

      const request = new XMLHttpRequest()
      request.open("POST","https://isc.obounce.net/api.php",true)
      request.onreadystatechange = ()=>{
        if(request.readyState === 4 && request.status === 200){
          const responseJSON = JSON.parse(request.response)
          if(responseJSON.status){
            // responseJSON.questions.forEach((data)=>{
            //   this.state.questions.push(data)
            // })
            // this.state.fetched = true
            this.setState({
              fetched: true,
              questions: responseJSON.questions
            })
          }
        }
      }
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      request.send(`checktcode=${checktcode}&sesscode=${scode}&admno=${admno}&testcode=${tcode}`)
    }

  }

  //function that indiciates the option clicked by the student and save it for reference purpose
  onChecked = (event)=> {
    //retain the value of the clicked element
    event.persist()

    this.state.answers[this.state.currentIndex] = event.currentTarget.dataset.id
    if(event.currentTarget.dataset.id === "a"){
      this.state.questions[this.state.currentIndex].colora = "list-group-item picked";
      this.state.questions[this.state.currentIndex].colorb = "list-group-item";
      this.state.questions[this.state.currentIndex].colorc = "list-group-item";
      this.state.questions[this.state.currentIndex].colord = "list-group-item";
      this.state.questions[this.state.currentIndex].colore = "list-group-item";
    }else if(event.currentTarget.dataset.id === "b"){
      this.state.questions[this.state.currentIndex].colorb = "list-group-item picked";
      this.state.questions[this.state.currentIndex].colora = "list-group-item";
      this.state.questions[this.state.currentIndex].colorc = "list-group-item";
      this.state.questions[this.state.currentIndex].colord = "list-group-item";
      this.state.questions[this.state.currentIndex].colore = "list-group-item";
    }else if(event.currentTarget.dataset.id === "c"){
      this.state.questions[this.state.currentIndex].colorc = "list-group-item picked";
      this.state.questions[this.state.currentIndex].colorb = "list-group-item";
      this.state.questions[this.state.currentIndex].colora = "list-group-item";
      this.state.questions[this.state.currentIndex].colord = "list-group-item";
      this.state.questions[this.state.currentIndex].colore = "list-group-item";
    }else if(event.currentTarget.dataset.id === "d"){
      this.state.questions[this.state.currentIndex].colord = "list-group-item picked";
      this.state.questions[this.state.currentIndex].colorb = "list-group-item";
      this.state.questions[this.state.currentIndex].colorc = "list-group-item";
      this.state.questions[this.state.currentIndex].colora = "list-group-item";
      this.state.questions[this.state.currentIndex].colore = "list-group-item";
    }else{
      this.state.questions[this.state.currentIndex].colora = "list-group-item";
      this.state.questions[this.state.currentIndex].colorb = "list-group-item";
      this.state.questions[this.state.currentIndex].colorc = "list-group-item";
      this.state.questions[this.state.currentIndex].colord = "list-group-item";
      this.state.questions[this.state.currentIndex].colore = "list-group-item picked";
    }

  }

  //function for calculating student scores and sending it back to the API
  calculate = ()=>{
    //iniitial exam score for student
    let studentMark = 0
    //calculate the student score
    this.state.questions.forEach((question,index)=>{
      if(this.state.answers.length >= 1){
        if(question.ansoption.toLowerCase() === this.state.answers[index].toLowerCase()){
          studentMark += 1
        }
      }

    })

    //load exam details data from localStorage API
    const responseJSON = localStorage.getItem("examDetails")
    //load student data from sessionStorage API
    const student = sessionStorage.getItem("sesscode")
    //Post request parameters
    const sendResult = responseJSON.status
    const testcode = responseJSON.testcode
    const admno = student.admno
    const teacheruname = responseJSON.teacher
    const result = studentMark
    const sesscode = student.sesscode

    //using AJAX to submit to the API
    const request = new XMLHttpRequest()
    request.open("POST","https://isc.obounce.net/api.php",true)
    request.onreadystatechange = ()=>{
      if(request.readyState === 4 && request.status === 4){
          //convert the response to a JSON format and store it in a variable
          const responseJSON = JSON.parse(request.response)
          if(responseJSON.status){
            //if submitted redirect back to end of exam page and remove the examID session from the API
            sessionStorage.remove("examID");
            <Redirect to = {"/iscbt/examsubmitted"} />
          }else{
            this.setState({
              error: true,
              errorMessage: responseJSON.message
            })
          }
      }
    }
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    request.send(`sendResult=${sendResult}&testcode=${testcode}&admno=${admno}&teacheruname=${teacheruname}&result=${result}&sesscode=${sesscode}`)
    alert(`Your result is: ${studentMark} / ${this.state.questionNo}`)
  }

  //submit if time is over on behalf of the student
  submitOnBehalf = ()=>{
    if(this.state.hours === 0 && this.state.minutes === 0 && this.state.second === 0){
      this.calculate()
    }
  }
  render() {
    if(!this.state.examReady){
      return (
        <Redirect to = {"/iscbt/register"} />
      )
    }
    if(this.state.redirect){
      return(
        <Redirect to = {"/iscbt/login"} />
      )
    }
    return(
      <div className = "container-fluid">
      {
        !this.state.fetched
        &&
        this.fetchQuestions()
      }
        <Header companyName = {this.state.companyName}/>
        <div className = "main-park">
          <div className = "timer-park">
            <div className = "time-park">
              <div className = "hour rounded-circle">{this.state.hours}</div>
              <div className = "time-text">H</div>
            </div>
            <div className = "time-park">
              <div className = "minute rounded-circle">{this.state.minutes}</div>
              <div className = "time-text">M</div>
            </div>
            <div className = "time-park">
              <div className = "second rounded-circle">{this.state.second}</div>
              <div className = "time-text">S</div>
            </div>
          </div>
          <div className = "contaner-fluid row heading">
            <div className = "col">
              Admission Number: {this.state.examCode}
            </div>
            <div className = "col">
              {this.state.className} : {this.state.subject}
            </div>
            <div className = "col">
              {this.state.term} Term
            </div>
          </div>
          <div className = "exam-park container-fluid">
            <h5 style = {{padding: "10px"}} className = "diplay-8">Instruction: {this.state.questions[this.state.currentIndex].instruction}</h5>
            <div className = "row display-5">
              <ul className="list-group container-fluid" style = {{textAlign:"left",fontFamily: "cursive",padding: "10px"}}>
                <li key = {this.state.currentIndex + ""} data-id = "" className="list-group-item">{this.state.currentIndex+1}. {this.state.questions[this.state.currentIndex].question}</li>
                <li key = {this.state.currentIndex+1 + "a"} data-id = "a" className={`${this.state.questions[this.state.currentIndex].colora} list-group-item`} onClick = {this.onChecked}>{this.state.questions[this.state.currentIndex].a}</li>
                <li key = {this.state.currentIndex+1 + "b"} data-id = "b" className={`${this.state.questions[this.state.currentIndex].colorb} list-group-item`} onClick = {this.onChecked}>{this.state.questions[this.state.currentIndex].b}</li>
                <li key = {this.state.currentIndex+1 + "c"} data-id = "c" className={`${this.state.questions[this.state.currentIndex].colorc} list-group-item`} onClick = {this.onChecked}>{this.state.questions[this.state.currentIndex].c}</li>
                <li key = {this.state.currentIndex+1 + "d"} data-id = "d" className={`${this.state.questions[this.state.currentIndex].colord} list-group-item`} onClick = {this.onChecked}>{this.state.questions[this.state.currentIndex].d}</li>
                <li key = {this.state.currentIndex+1 + "e"} data-id = "e" className={`${this.state.questions[this.state.currentIndex].colore} list-group-item`} onClick = {this.onChecked}>{this.state.questions[this.state.currentIndex].e}</li>
              </ul>
            <div className = "container-fluid btn-park">
              <button className = "btn my-btn prev" type = "button" onClick = {this.prev}>&#60;&#60;</button>
              {
                this.state.questions.map((question,index)=>{
                  return <button key = {index} className = "btn my-btn next" type = "button" onClick = {this.eachQuestion}>{index+1}</button>
                })
              }
              <button className = "btn my-btn next" type = "button" onClick = {this.next}> >> </button>
              {
                this.state.error
                &&
                <div className = "error">{this.state.errorMessage}</div>
              }
            </div>
            {
              this.state.currentIndex+1 === this.state.questionNo
              &&
              <Link to = {"/iscbt/examsubmitted"}><button className = "submit-btn next" type = "button" onClick = {this.calculate}> SUBMIT </button></Link>
            }
            </div>
          <div>
        </div>
        </div>
        </div>
        <Footer companyName = {this.state.companyName} companyAddr = {this.state.companyAddr}/>
      </div>
    )
  }
}
export default Exam
