import React from 'react';
import Result from './Result'
import CalculaterButton from './CalculatorButton'
import History from './History'

const elements = ['1','2','3','+','4','5','6','-','7','8','9',':','*','^', 'CE','=','history']

export default class Calculator extends React.Component {
  constructor(){
    super()
    this.state= {result:"", history: [], isShowHistory: false}
    this.onClick = this.onClick.bind(this)
  }
  onClick = action => {
    let expectedResult = {}
    switch (true) {
      case action == "CE":
        this.setState({result: ""})
        break;
      case action == "=": 
        this.calculate()
        break;
      case action.includes("history"):
        this.setState({result: this.state.result, history: this.state.history, isShowHistory: true})
        break;
      default: 
        this.setState({result: this.state.result+= action})
    }

  }
  
  calculate = () => {
    let checkedResult = ""
    let numbers;
    switch (true) {
      case this.state.result.includes("--"): 
        checkedResult = this.state.result.replace("--","+");
        break;
      case this.state.result.includes(":"): 
        checkedResult = this.state.result
        numbers  = checkedResult.split(":")
        let divideresult = parseInt(numbers[0])/parseInt(numbers[1])
        this.setState({
          result: divideresult,
          history: this.state.history.concat([divideresult]),
          isShowHistory: this.state.isShowHistory
        }) 
        break;
      case this.state.result.includes("^"):
        checkedResult = this.state.result
        numbers = checkedResult.split("^")
        let powResult = Math.pow(numbers[0],numbers[1])
        this.setState({
          result: powResult,
          history: this.state.history.concat([powResult]),
          isShowHistory: this.state.isShowHistory
        })
        break;
      case this.state.result.includes("+") ||  checkedResult.includes("-"):
        checkedResult = this.state.result
        try {
          this.setState({
           result: eval(checkedResult).toString() || "",
           history: this.state.history.concat([eval(checkedResult)]),
           isShowHistory: this.state.isShowHistory
          }) 
       } catch(e) {
         this.setState({
          result: "error",
          history: this.state.history,
          isShowHistory: this.state.isShowHistory
         })
       }
       break;
    }
  }
  
render() {
  let history = <span></span>
  if( this.state.isShowHistory) {
    history = <History history={this.state.history}></History>
  }

  return (
    <div>
      <Result result={this.state.result}></Result>
      { elements.map((action, index) => (
        <span><CalculaterButton value={action} onClick={this.onClick}> </CalculaterButton>{ (index+1)%4==0 && <br></br> }</span>	
      )) }
      {history}
    </div>
  )
  }
}