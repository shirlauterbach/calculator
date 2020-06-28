import React from 'react';

export default class Result extends React.Component {
	render() {
		let result = this.props.result
		return (
			<div>
				<span>{result}</span>
			</div>
		)
	}
}