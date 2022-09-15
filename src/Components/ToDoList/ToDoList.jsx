/* eslint-disable react/prefer-stateless-function */
import React, { Component, useState } from 'react';
import PropTypes, { bool, string } from 'prop-types';
import './ToDoList.css';

export default class ToDoList extends Component {
  render() {
    const {
      todos,
      check,
      modifyItem,
      deletItem,
    } = this.props;

    return (
      <ul className="ul-Container">
        {todos.map((ObjecList, index) => (
          <Item
            key={ObjecList.id}
            id={index}
            title={ObjecList.title}
            checked={ObjecList.completed}
            addCheck={check}
            modifyItem={modifyItem}
            deletItem={deletItem}
          />
        ))}
      </ul>
    );
  }
}

// Send the title and the crossline over the text
const Item = (props) => {
  const {
    id,
    title,
    checked,
    addCheck,
    modifyItem,
    deletItem,
  } = props;

  const [input, setInput] = useState(title);
  let style = { textDecoration: 'none' };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      const id = parseInt(event.target.id, 10);
      // const clean = event.target.value.trim();
      modifyItem(event.target.value, id);
    }
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  if (checked === true) {
    style = { textDecoration: 'line-through' };
  }

  return (
    <li className="li-element">
      <input className="checkbox" id={id} type="checkbox" checked={checked} onChange={addCheck} />
      <input className="li-input-text" id={id} type="text" style={style} value={input} onChange={handleInput} onKeyPress={handleEnter} />
      <button type="button" id={id} onClick={deletItem} className="delet-icon">
        +
      </button>
    </li>
  );
};

// Default Props & proptypes zone
Item.defaultProps = {
  id: 0,
  title: string,
  checked: bool,
  addCheck: bool,
  modifyItem: bool,
  deletItem: bool,
};

Item.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  checked: PropTypes.bool,
  addCheck: PropTypes.func,
  modifyItem: PropTypes.func,
  deletItem: PropTypes.func,
};

ToDoList.defaultProps = {
  todos: [],
  check: null,
  modifyItem: null,
  deletItem: null,
};

ToDoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(
      {
        id: PropTypes.number,
        title: PropTypes.string,
        completed: PropTypes.bool,
      },
    ),
  ),
  check: PropTypes.func,
  modifyItem: PropTypes.func,
  deletItem: PropTypes.func,
};
