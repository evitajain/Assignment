import React from 'react';
//import logo from './logo.svg';
import './App.css';

class Calculator extends React.Component { 

  constructor(props){
    super(props);
    this.state = {
      value: null,
      displayValue: '0',
      waitingForOperand: false,
      operator: null
    }
  }

  inputDigit(digit){ 
    const displayValue = this.state.displayValue;
    const waitingForOperand = this.state.waitingForOperand;

    if(waitingForOperand){
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else{
      this.setState({
        displayValue: (displayValue === '0') ? String(digit) : displayValue + digit
      })
    }
   
  }

  inputDot(){
    const displayValue = this.state.displayValue;
    const waitingForOperand = this.state.waitingForOperand;

    if(waitingForOperand){
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    } else if(displayValue.indexOf('.') === -1){
      this.setState({
        displayValue: displayValue + '.'
      })
    }   
  }

  clearDisplay(){
    this.setState({
      displayValue: '0'
    })
  }

  inputPercent(){
    const displayValue = this.state.displayValue;

    this.setState({
      displayValue: String(displayValue/100)
    })
  }

  performOperation(nextOperator){
    const displayValue = this.state.displayValue;
    const operator = this.state.operator;
    const value = this.state.value;

    const nextValue = parseFloat(displayValue);

    const operations = {
      '/': (prevValue,nextValue) => prevValue / nextValue,
      '*': (prevValue,nextValue) => prevValue * nextValue,
      '-': (prevValue,nextValue) => prevValue - nextValue,
      '+': (prevValue,nextValue) => prevValue + nextValue,
      '=': (prevValue,nextValue) => nextValue
    }

    if(value === null){
      this.setState({
        value: nextValue
      })
    } else if(operator){
      const currentValue = value ||0 ;
      const computedValue = operations[operator](currentValue,nextValue);
      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }

    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  render() { 

    return ( 
      <div className="container-fluid p-0">
          <div className="calculator">
            <div className="calculator-display">{this.state.displayValue}</div>
            <div className="input-keys">
              <div className="row m-0">
                <div className="col-md-3 p-0">
                  <button className="calc-ac" onClick={() => this.clearDisplay()}>AC</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-history">HISTORY</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-percent" onClick={() => this.inputPercent()}>%</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-divide" onClick={() => this.performOperation('/')}>/</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-7" onClick={()=> this.inputDigit(7)}>7</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-8" onClick={()=> this.inputDigit(8)}>8</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-9" onClick={()=> this.inputDigit(9)}>9</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-multiply" onClick={() => this.performOperation('*')}>*</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-4" onClick={()=> this.inputDigit(4)}>4</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-5" onClick={()=> this.inputDigit(5)}>5</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-6" onClick={()=> this.inputDigit(6)}>6</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-sub" onClick={() => this.performOperation('-')}>-</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-1" onClick={()=> this.inputDigit(1)}>1</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-2" onClick={()=> this.inputDigit(2)}>2</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-3" onClick={()=> this.inputDigit(3)}>3</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-plus" onClick={() => this.performOperation('+')}>+</button>
                </div>
                <div className="col-md-6 p-0">
                  <button className="calc-zero" onClick={()=> this.inputDigit(0)}>0</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-dot" onClick={()=> this.inputDot()}>.</button>
                </div>
                <div className="col-md-3 p-0">
                  <button className="calc-equal" onClick={() => this.performOperation('=')}>=</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    ); 
  } 
} 

export default Calculator;
