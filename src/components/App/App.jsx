import React, { useState } from 'react';

import Header from '../Header/Header';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

import './App.css';

function counter() {
  let maxId = 1;
  return () => maxId++;
}

const maxId = counter();

function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setOnFilter] = useState('All');
  const editTask = (id) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((data) => data.id === id);
      const oldData = todoData[index];
      const newData = { ...oldData, edit: !oldData.edit };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return newArray;
    });
  };

  const onSubmitEdit = (event, id) => {
    event.preventDefault();
    setTodoData((todoData) => {
      const index = todoData.findIndex((data) => data.id === id);
      const oldData = todoData[index];
      const newData = { ...oldData, edit: !oldData.edit, task: event.target[0].value };
      const newArray = [...todoData.slice(0, index), newData, ...todoData.slice(index + 1)];
      return newArray;
    });
  };

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
      return newArray;
    });
  };

  const addItem = (text, time) => {
    if (text) {
      const newItem = {
        id: maxId(),
        task: text,
        completed: false,
        edit: false,
        time: new Date(),
        timer: time,
      };
      setTodoData((todoData) => {
        const newArray = [...todoData, newItem];
        return newArray;
      });
    }
  };

  const onToggleCompleted = (id) => {
    changeItemInData(id, 'completed');
  };

  const getRender = () => {
    switch (filter) {
      case 'All':
        return todoData;
      case 'Active':
        return todoData.filter((el) => !el.completed);
      case 'Completed':
        return todoData.filter((el) => el.completed);
      default:
        break;
    }
  };

  const setFilter = (filter) => {
    setOnFilter(filter);
  };

  const countActive = () => {
    const newArray = [];
    todoData.forEach((el) => {
      if (!el.completed) {
        newArray.push(el);
      }
    });
    return newArray.length;
  };

  const removeCompleted = () => {
    setTodoData((todoData) => {
      const newArray = [];
      todoData.forEach((el) => {
        if (!el.completed) {
          newArray.push(el);
        }
      });
      return newArray;
    });
  };

  //Замена значения

  const changeItemInData = (id, value) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];
      const newItem = { ...oldItem, [value]: !oldItem[value] };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return newArray;
    });
  };

  // Установка таймера

  const changeTimerValue = (id, value) => {
    setTodoData((todoData) => {
      const index = todoData.findIndex((el) => {
        return el.id === id;
      });

      const oldItem = todoData[index];
      if (typeof oldItem === 'undefined') return todoData;
      const newItem = { ...oldItem, timer: value };
      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];

      return newArray;
    });
  };
  return (
    <section className="todoapp">
      <Header onItemAdd={addItem} />
      <section className="main">
        <TaskList
          todoData={getRender()}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          editTask={editTask}
          onSubmitEdit={onSubmitEdit}
          changeTimerValue={changeTimerValue}
        />
        <Footer setFilter={setFilter} removeCompleted={removeCompleted} countActive={countActive} />
      </section>
    </section>
  );
}

export default App;
