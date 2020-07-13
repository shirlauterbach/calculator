const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 4000
let history = []

app.use( bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use((req,res, next) => {
	res.setHeader('Access-Control-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 
	'Origin,  X-Requested-With, Content-Type, Accept, Authorization')
	res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	next()
})

app.post("/history", (req,res) => {
	history = history.concat([req.body.historyToAdd])
	res.send(history)
})



