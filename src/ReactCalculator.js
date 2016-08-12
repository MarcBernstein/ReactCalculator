// src/ReactCalculator.js

import React, { Component } from 'react';
import {
  View,
  Text,
  AppRegistry
} from 'react-native';
import Style from './Style';

import InputButton from './InputButton';

// Define the input buttons that will be displayed in the calculator.
const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+']
];

class ReactCalculator extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      previousInputValue: 0,
      inputValue: 0,
      selectedSymbol: null
    }
  }
  
  render() {
    return (
      <View style={Style.rootContainer}>
        <View style={Style.displayContainer}>
          <Text style={Style.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={Style.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    )
  }
  
  /**
  * For each row in `inputButtons`, create a row View and add create an InputButton for each input in the row.
  */
  _renderInputButtons() {
    let views = [];
    
    for (var r = 0; r < inputButtons.length; r ++) {
      let row = inputButtons[r];
      
      let inputRow = [];
      for (var i = 0; i < row.length; i ++) {
        let input = row[i];
        
        inputRow.push(
          <InputButton
            value={input}
            highlight={this.state.selectedSymbol === input}
            onPress={this._onInputButtonPressed.bind(this, input)}/>
        );
      }
      
      views.push(<View style={Style.inputRow}>{inputRow}</View>)
    }
    
    return views;
  }
  
  _onInputButtonPressed(input) {
    switch (typeof input) {
      case 'number':
        return this._handleNumberInput(input)
      case 'string':
        return this._handleStringInput(input)
    }
  }

  _handleNumberInput(num) {
    if (this.state.selectedSymbol === '.') {
      let inputValue = Number(this.state.inputValue.slice(0, this.state.inputValue.length - 1)) + (num / 10);

      this.setState({
        inputValue: inputValue,
        selectedSymbol: null
      })
    } else {
      let inputValue = (this.state.inputValue * 10) + num;

      this.setState({
        inputValue: inputValue
      })
    }
  }

  _handleStringInput(str) {
    switch (str) {
      case '/':
      case '*':
      case '+':
      case '-':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        });
        break;
      case '=':
        let symbol = this.state.selectedSymbol,
        inputValue = this.state.inputValue,
        previousInputValue = this.state.previousInputValue;

        if (!symbol) {
          return;
        }

        this.setState({
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + inputValue),
          selectedSymbol: null
        });
        break;
      case '.':
        let newValue = this.state.inputValue + '.';

        this.setState({
          previousInputValue: this.state.inputValue,
          inputValue: newValue,
          selectedSymbol: str
        });
        break;
    }
  }
}

AppRegistry.registerComponent('ReactCalculator', () => ReactCalculator);