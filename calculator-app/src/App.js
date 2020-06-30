import React from 'react';
import Calculator from './Components/Calculator'
import './App.css';

const App = () =>  {
  return <div className="app-body">
    <div className="calculator-header">
      Calculator
    </div>
    <Calculator/>
  </div>
}

export default App;
