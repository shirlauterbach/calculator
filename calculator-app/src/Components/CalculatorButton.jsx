import React from 'react'

export default class CalculatorButton extends React.Component{
	constructor() {
		super()
		
	}
	render() {
		return (
			<button onClick={() => this.props.onClick(this.props.value)}>
				{this.props.value}

			</button>
		)
	}
}