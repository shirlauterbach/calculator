import React from 'react'
import '../style/Calculatorbutton.css'

const CalculatorButton = (props) => {
	return (
		<button className={ (props.value === 'history' ? "history-btn " : "" ) + "calculatorbtn " }  onClick={() => props.onClick(props.value)}>
			{props.value}
		</button>
	)
}

export default CalculatorButton;