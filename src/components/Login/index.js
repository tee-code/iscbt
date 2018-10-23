import React, { Component } from "react"
import Header from '../Header'
import Footer from '../Footer'
import '../Home/Home.css'
import '../Register/Register.css'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: "",
            companyAddr: "",
            username: "",
            pword: "",
            redirect: false,
            sesscode: "",
            error: false
        }
        this.onLogin = this.onLogin.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    onLogin = () => {
        const request = new XMLHttpRequest()
        request.open("POST", "https://isc.obounce.net/api.php/login", true)
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                const resultJSON = JSON.parse(request.response)
                if (resultJSON.status) {
                    sessionStorage.setItem("sesscode", JSON.stringify(resultJSON))
                    this.setState({redirect: true, sscode: resultJSON.sesscode})
                }else{
                  this.setState({error: true})
                }
            }
        }
        const login = true;
        const username = this.state.username;
        const pword = this.state.pword;
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(`login=${login}&username=${username}&pword=${pword}`);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
      const request = new XMLHttpRequest()
      request.open("GET", "https://isc.obounce.net/api.php?schinfo", true)
      request.onreadystatechange = () =>{
        if(request.readyState === 4 && request.status === 200){
          const responseJSON = JSON.parse(request.response)
          localStorage.setItem("schoolData",JSON.stringify(responseJSON))
          this.setState({companyName: responseJSON.schname,companyAddr: responseJSON.schaddr})
        }
      }

      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.send()
    }
    render() {
        window.addEventListener('storage',(event)=>{
          console.log(event)
        })
        if(this.state.redirect){
          return (
            <Redirect to = {"/iscbt/home"} />
          )
        }
        if(sessionStorage.getItem("sesscode")){
          return (
            <Redirect to = {"/iscbt/home"} />
          )
        }
        return (
          <div className = "container-fluid" style = {{padding: "0px"}}>
            <Header companyName = { this.state.companyName } linkName = ""/>
            <div className = "jumbotron Main" >
              <div>
                <div className = "rounded-box" ><span className = "display-3">W</span>elcome</div>
                <h1 className = "display-4" > { this.state.companyName } STUDENT PORTAL </h1>
                <p className = "lead"> Kindly provide your login details </p>
                <hr className = "my-4"/>
              </div>
              <form>
                <div className = "form-group container-fluid" >
                  <label className = "form-label label-bg" > STUDENT LOGIN </label>
                  <div className = "form-park" >
                    {
                      this.state.error
                      &&
                      <button type = "button" className = "btn btn-block my-btn error" > Invalid username or password </button>
                    }
                    <div className = "input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                      <input className = "form-control" name = "username" type = "text" placeholder = "e.g. 200868" onInput = { this.onChange } required = {true}/>
                    </div>
                    <div className = "input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                      <input className = "form-control" name = "pword" type = "password" placeholder = "e.g. 200868" onInput = { this.onChange } required = {true}/>

                    </div>
                    <button type = "button" className = "btn btn-block my-btn" onClick = { this.onLogin } > Submit < /button>
                    <br / >
                    <p className = "lead" > Forgot your details ? Contact your school Administrator < /p>
                  </div >
                  </div>
              </form >
            </div>
            <Footer companyName = { this.state.companyName } companyAddr = { this.state.companyAddr }/>
          </div >
        )
    }
}
export default Login
