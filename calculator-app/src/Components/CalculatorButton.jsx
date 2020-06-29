import React from 'react'
import '../style/Calculatorbutton.css'

export default class CalculatorButton extends React.Component{
	constructor() {
		super()
		
	}
	render() {
		return (
			<button className={ ( this.props.value == 'history' ? "history-btn " : "" ) + "calculatorbtn " }  onClick={() => this.props.onClick(this.props.value)}>
				{this.props.value}

			</button>
		)
	}
}