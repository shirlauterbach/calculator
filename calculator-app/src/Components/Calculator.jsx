import React from 'react';
import Result from './Result'
import CalculaterButton from './CalculatorButton'
import History from './History'
import axios from 'axios'
import '../style/calculator.css'

export default class Calculator extends React.Component {
  constructor(){
    super()
    this.state= {tmpRes:"",isPressed: false,isCalculated: false, result:"", history: [], isShowHistory: false}
    this.onClick = this.onClick.bind(this)
  }

  async componentDidUpdate(prevProps){
    if (!this.state.isCalculated && this.state.isPressed) {
      let result = await this.calculate()
      if (!Number.isNaN(result) && typeof(result) != 'string') {
        this.setState({...this.state, tmpRes: result, isCalculated : false, isPressed:false})
      }
    } else if (this.state.isPressed) {
      this.setState({...this.state, isCalculated : false, isPressed:false} )
    }
  }  

  elements = ['1','2','3','+','4','5','6','-','7','8','9',':','*','0','^', 'CE','=','history']

  async setResult(result) {
    let history;
    await axios.post("http://localhost:4000/history", {historyToAdd: result}).then(res => {
      history = res.data
    })
    this.setState({...this.state,
      result: result,
      isPressed: true,
      history: history
    })
  }

  async onClick(action ){
      switch (true) {
        case action === "CE":
          this.setState({...this.state, tmpRes: "",result: ""})
          break;
        case action === "=": 
            let result = await this.calculate()     
            this.setResult(result);   
          break;
        case action.includes("history"):
          this.setState({...this.state,isPressed: true, isShowHistory:!this.state.isShowHistory})
          break;
        default: 
          this.setState({...this.state, result: this.state.result+= action, isPressed: true})
          break;
      }
    }

  async calculate  ()  {
    let checkedResult = this.state.result.toString()
    let numbers;
    switch (true) {
      case checkedResult.includes("--"): 
        checkedResult = this.state.result.replace("--","+");
        this.setState({...this.state, isCalculated: true})
        return checkedResult;
      case checkedResult.includes(":"): 
        checkedResult = this.state.result
        let divideresult=""
        numbers  = checkedResult.split(":")
        if (numbers.length >1 && numbers[1] !== ""){
          divideresult = parseInt(numbers[0])/parseInt(numbers[1])
          this.setState({...this.state, isCalculated: true})
        }
        return divideresult;
      case checkedResult.includes("*"):
        checkedResult = this.state.result
        let multiplyres = ""
        numbers = checkedResult.split("*")
        if (numbers.length > 1 && numbers[1] !="") {
          multiplyres= parseInt(numbers[0])*(parseInt(numbers[1]))
          this.setState({...this.state, isCalculated: true})
        }
        return multiplyres;
      case checkedResult.includes("^"):
        let powResult = ""
        checkedResult = this.state.result
        numbers = checkedResult.split("^")
        if (numbers.length > 1 && numbers[1] !== "") {
          powResult = Math.pow(parseInt(numbers[0]),parseInt(numbers[1]))
          this.setState({...this.state,
            isCalculated: true
          })
        } 
        return powResult
      case (checkedResult.includes("+") ||  checkedResult.includes("-")):
        checkedResult = this.state.result
        try {
          checkedResult = eval(checkedResult) || ""
          this.setState({...this.state, isCalculated: true })
        } catch(e) {
          checkedResult = "error"
        }
        return checkedResult;
      default:
        return this.state.result
    }
  }

  closeHistory = () => {
    this.setState({ ...this.state, isShowHistory: !this.state.isShowHistory })
  }

  render(){
    let history = <span/>
    let calculatedbeforeequal
    if(this.state.isShowHistory) {
      history = <History history={this.state.history}/>
    }
    else {
      history = <History history={[this.state.history[this.state.history.length - 1]] || []}/>
    }

    if (this.state.isCalculated) {
      calculatedbeforeequal = <p/>
    }

    return (
      <div className="calculator">
        <Result result={this.state.result}/>
        <div className="tmpres"> { "Temp result " + this.state.tmpRes }</div>
        { this.elements.map((action, index) => (
          <span><CalculaterButton value={action} onClick={this.onClick}/> { (index+1)%4===0 && <br/> }</span>	
        )) }
        {history}
        { this.state.isShowHistory ? <button className="closeHistory" onClick={this.closeHistory}>close </button> : <span/> }
      </div>
    )
  }
}