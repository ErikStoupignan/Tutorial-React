import './ToDoApp.css';
import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ToDoList from '../ToDoList/ToDoList';
import Header from '../Header/Header';

export default class ToDoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addChecked = this.addChecked.bind(this);
    this.modifyItem = this.modifyItem.bind(this);
  }

  // Local Storage - Download from the browser
  componentDidMount() {
    const temp = localStorage.getItem('todos');
    const loadedInfo = JSON.parse(temp);
    if (loadedInfo) {
      this.setState({ todos: loadedInfo });
    }
  }

  // Local Storage - Download from the browser
  componentDidUpdate(prevState) {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      const temp = JSON.stringify(todos);
      localStorage.setItem('todos', temp);
    }
  }

  // Save every letter inside the main input
  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  // Add new element inside the list
  addItem() {
    const { input, todos } = this.state;
    const shallowCopy = [...todos];
    if (input === '') return;
    const clean = input.trim();
    const newElement = { id: uuidv4(), title: clean, completed: false };
    shallowCopy.push(newElement);
    this.setState({ todos: shallowCopy, input: '' });
  }

  // Delete li item function
  deleteItem(index) {
    this.setState((previousState) => {
      const { todos } = previousState;

      const newArr = todos.filter(({ id }) => id !== index);
      return { todos: newArr };
    });
  }

  // Review the state of of the checkbox
  addChecked(event) {
    const { id } = event.target;
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

  // Modify the content inside the every Li element
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
        <Header />
        <div className="form-container">
          <input className="main-input" placeholder="add item..." type="text" value={input} onChange={this.handleChange} />
          <button className="main-button App-logo-spin App-logo" type="button" onClick={this.addItem}>+</button>
        </div>
        <ToDoList
          todos={todos}
          check={this.addChecked}
          modifyItem={this.modifyItem}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
