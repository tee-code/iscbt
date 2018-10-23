import React,{ Component } from 'react'
import Intro from "../Intro"
import Login from "../Login"
import CheckResult from "../CheckResult"
import Exam from "../Exam"
import Home from "../Home"
import Register from "../Register"
import ExamEnded from "../ExamEnded"
import { Switch,Route } from "react-router-dom"
import Result from '../Result'
import ResultPreview from '../ResultPreview'

const Main = () => (

  <Switch>
    <Route exact path = "/" component = {Home} />
    <Route path = "/iscbt/login" component = {Login} />
    <Route path = "/iscbt/intro" component = {Intro} />
    <Route path = "/iscbt/checkresult" component = {CheckResult} />
    <Route path = "/iscbt/result" component = {Result} />
    <Route path = "/iscbt/resultpreview" component = {ResultPreview} />
    <Route path = "/iscbt/register" component = {Register} />
    <Route path = "/iscbt/exam" component = {Exam} />
    <Route path = "/iscbt/examsubmitted" component = {ExamEnded} />
    <Route path = "/iscbt" component = {Home} />
    <Route path = "/iscbt/home" component = {Home} />
    <Route path = "/iscbt/exam" component = {Exam} />
    <Route path = "/iscbt/intro" component = {Intro} />
  </Switch>

)

export default Main
