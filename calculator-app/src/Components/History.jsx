import React from 'react'

export default class History extends React.Component{
	render() {
		return (
			<div>
				{this.props.history.map((result) => (
					<div> { result } </div>
				))}
			</div>
		)
	}
}