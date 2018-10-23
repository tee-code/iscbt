import React, { Component } from 'react'
import './Result.css'
import Header from '../Header'
import Footer from '../Footer'
import '../Home/Home.css'

import {Link,Redirect} from 'react-router-dom'

class Result extends Component{
  constructor(props){
    super(props)
    this.state = {
      companyName: "",
      studentName: "",
      className: "",
      session: "",
      term: "",
      redirect: false,
      result: [{}],
      otherinfo: {}
    }
    this.printResult = this.printResult.bind(this)
    this.logout = this.logout.bind(this)
  }

componentWillMount(){
  if(!sessionStorage.getItem("resultData")){
    this.setState({
      redirect: true
    })
  }

  const responseJSON = JSON.parse(sessionStorage.getItem("sesscode"))
  const resultJSON = JSON.parse(sessionStorage.getItem("resultData"))
  const schoolData = JSON.parse(localStorage.getItem("schoolData"))

  this.setState({
    companyName: schoolData.schname,
    companyAddr: schoolData.schaddr,
    session: resultJSON.years,
    term: resultJSON.terms
  })

  const checkresult = responseJSON.status
  const admno = responseJSON.admno
  const year = resultJSON.years[0]
  const term = resultJSON.terms[0]

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
          result: responseJSON.resultinfo,
          otherinfo: responseJSON.otherinfo
        })
      }
    }
  }

  request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
  request.send(`checkresult=${checkresult}&admno=${admno}&year=${year}&term=${term}`)
}
printResult = ()=>{
  const content = document.querySelector("#result").outerHTML
  const mywindow = window.open('', 'Print');

    mywindow.document.write('<html><head><title>Print Result</title>');
    mywindow.document.write(
      `<style>
      table{
        width: 100%;
        margin-bottom: 1rem;
        background-color: transparent;
        border-collapse: collapse;
        border-spacing: 2px;
        text-align: center;
      }
      .table-bordered th, .table-bordered td {
        border: 1px solid #dee2e6;
      }
      .table th, .table td {
          padding: 0.75rem;
          vertical-align: top;
          border-top: 1px solid #dee2e6;
      }
      </style>`
    )
    mywindow.document.write('</head><body>');
    mywindow.document.write(content);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
    return true;
}

logout = ()=>{
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
    if(this.state.redirect){
      return (
        <Redirect to = {"/iscbt/checkresult"} />
      )
    }
    return(
      <div className = "container-fluid">
        <Header companyName = {this.state.companyName} linkName = "Logout | " />
        <div className = "jumbotron result-parker">
          <table id = "result" className = "table table-bordered">
            <thead>
              <tr>
                <th colSpan = "6" scope = "col">{this.state.companyName}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan = "6">
                  {this.state.companyAddr}
                  <br/>
                  {this.state.email}
                  <br/>
                  {this.state.phone}
                </td>
              </tr>
              <tr>
                <td colSpan = "6">{this.state.term.toString().toUpperCase()} TERM EXAMINATION RESULT {this.state.session} SESSION</td>
              </tr>
              <tr>
                <td colSpan = "6">{this.state.otherinfo.lastname} {this.state.otherinfo.firstname}</td>
              </tr>
              <tr>
                <td colSpan = "6">
                  <p style = {{float: "left"}}>Admission No: {this.state.result[0].admno}</p>
                  <p style = {{float: "right"}}>Class: {this.state.otherinfo.class}</p>
                </td>
              </tr>
              <tr>
                <td colSpan = "6">
                  <table className = "table">
                    <thead>
                      <tr>
                        <th scope = "col">
                        S/N
                        </th>
                        <th scope = "col">
                        Subject
                        </th>
                        <th scope = "col">
                        C.A
                        </th>
                        <th scope = "col">
                        Exam
                        </th>
                        <th scope = "col">
                        Total
                        </th>
                        <th scope = "col">
                        Grades
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>40</th>
                        <th>60</th>
                        <th>100</th>
                      </tr>
                      {
                        this.state.result.map((data,index)=>{
                          return(
                            <tr>
                              <th>{data.number}</th>
                              <th>{data.subject}</th>
                              <th>{data.test1}</th>
                              <th>{data.test2}</th>
                              <th>{data.examtotal}</th>
                              <th>{data.mtotal}</th>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td colSpan = "4">
                  <p>{"Teacher's Remark"}</p>
                  <p><em>{this.state.otherinfo.tcomment}</em></p>
                </td>
                <td colSpan = "2">
                  <p>{"Percentage"}</p>
                  <p>{this.state.otherinfo.mypercent}%</p>
                </td>
              </tr>
            </tbody>
          </table>
          <button className = "btn my-btn" style = {{marginRight: "100px"}} onClick = {this.logout}>logout</button>
          <button className = "btn my-btn" onClick = {this.printResult}>Print Result</button>
        </div>

        <Footer companyName = {this.state.companyName} companyAddr = {this.state.companyAddr} />
      </div>
    )
  }
}



















export default Result
