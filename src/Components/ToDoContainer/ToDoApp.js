/* eslint-disable class-methods-use-this */
import './ToDoApp.css';
import React, { Component } from 'react';
import ToDoList from '../ToDoList/ToDoList';

export default class ToDoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: 'Setup development environment',
          completed: true,
        },
        {
          id: 2,
          title: 'Develop website and add content',
          completed: false,
        },
        {
          id: 3,
          title: 'Deploy to live server',
          completed: false,
        },
      ],
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addChecked = this.addChecked.bind(this);
    this.modifyItem = this.modifyItem.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  addItem() {
    const { input, todos } = this.state;
    const shallowCopy = [...todos];
    if (input === '') return;
    const clean = input.trim();
    const newElement = { id: todos.length + 1, title: clean, completed: false };
    shallowCopy.push(newElement);
    this.setState({ todos: shallowCopy });
  }

  addChecked(event) {
    const id = parseInt(event.target.id, 10);
    const { todos } = this.state;
    const array = [...todos];

    const newArray = array.map((obj) => {
      const shallowCopy = { ...obj };
      if (shallowCopy.id === id) {
        shallowCopy.completed = event.target.checked;
      }
      return shallowCopy;
    });

    this.setState({ todos: newArray });
  }

  modifyItem(newChange, id) {
    const { todos } = this.state;
    const array = [...todos];

    const newItem = array.map((object) => {
      const shallowCopy = { ...object };
      if (shallowCopy.id === id) {
        shallowCopy.title = newChange;
      }
      return shallowCopy;
    });

    this.setState({ todos: newItem });
  }

  render() {
    const { todos, input } = this.state;
    return (
      <div className="ToDoApp-Container">
        <div className="form-container">
          <input className="main-input" placeholder="add item..." type="text" value={input} onChange={this.handleChange} />
          <button className="main-button App-logo-spin App-logo" type="button" onClick={this.addItem}>+</button>
        </div>
        <ToDoList todos={todos} check={this.addChecked} modifyItem={this.modifyItem} />
      </div>
    );
  }
}
