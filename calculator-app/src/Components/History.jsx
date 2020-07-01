import React from 'react'

const History = ({history}) => {
	return (
		<div>
			{history.map((result) => (
				<div> { result } </div>
			))}
		</div>
	)
}

export default History