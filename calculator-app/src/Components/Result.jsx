import React from 'react';

const Result = (props) => {
	let result = props.result
	return (
		<div>
			<span>{result}</span>
		</div>
	)
}

export default Result