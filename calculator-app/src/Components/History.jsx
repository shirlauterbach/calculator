import React from 'react'

const History = (props) => {
	return (
		<div>
			{props.history.map((result) => (
				<div> { result } </div>
			))}
		</div>
	)
}

export default History