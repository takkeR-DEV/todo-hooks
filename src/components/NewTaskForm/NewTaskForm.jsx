import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

export default function NewTaskForm({ onItemAdd }) {
  const [task, setTask] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const clamp = (value, min, max) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  };
  // state = {
  //   task: '',
  //   min: '',
  //   sec: '',
  // };
  const onSubmitForm = (e) => {
    e.preventDefault();
    const timerSec = parseInt(min || 0) * 60 + parseInt(sec || 0) * 1;
    onItemAdd(task, timerSec);
    // this.setState({
    //   task: '',
    //   min: '',
    //   sec: '',
    // });

    setTask('');
    setMin('');
    setSec('');
  };
  const onChangeInput = (e) => {
    // this.setState({
    //   task: e.target.value,
    // });

    setTask(e.target.value);
  };

  const onChangeInputMin = (e) => {
    let value = e.target.value;
    if (value != '') e.target.value = clamp(+value, 0, 1440) || 0;
    // this.setState({
    //   min: e.target.value,
    // });
    setMin(e.target.value);
  };

  const onChangeInputSec = (e) => {
    let value = e.target.value;
    if (value != '') e.target.value = clamp(+value, 0, 60) || 0;
    // this.setState({
    //   sec: e.target.value,
    // });
    setSec(e.target.value);
  };
  // const { task, min, sec } = this.state;
  return (
    <form onSubmit={onSubmitForm} className="new-todo-form">
      <input className="new-todo" placeholder="Task" onChange={onChangeInput} value={task} autoFocus required />
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Min"
        onChange={onChangeInputMin}
        value={min}
        pattern="[0-9]{\,\2}"
      ></input>
      <input
        className="new-todo-form__timer"
        type="number"
        placeholder="Sec"
        onChange={onChangeInputSec}
        value={sec}
        pattern="[0-9]{2}"
      ></input>
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
}

NewTaskForm.defaultProps = {
  onItemAdd: () => {},
};
NewTaskForm.propTypes = {
  onItemAdd: PropTypes.func,
};
