import React from 'react';
import Calculator from './Components/Calculator'
import './App.css';


class App extends React.Component {
   
  constructor() {
    super()

  }

  
  render() {
    return <div className="app-body">
      <div className="calculator-header">
        Calculator
      </div>
      <Calculator></Calculator>

    </div>
  }
}

export default App;
