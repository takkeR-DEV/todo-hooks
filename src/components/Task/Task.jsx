import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Task.css';
export default function Task(props) {
  const {
    id,
    onToggleCompleted,
    completed,
    onDeleted,
    task,
    editTask,
    edit,
    onSubmitEdit,
    timerProp,
    time,
    changeTimerValue,
  } = props;

  const [dataText, setDataText] = useState(null);
  const [value, setValue] = useState(task);
  const [timer, setTimer] = useState(timerProp);
  const [pause, setPause] = useState(true);

  const setStateDataText = () => {
    setDataText(formatDistanceToNow(time, { includeSeconds: true }));
  };

  const timerRun = () => {
    if (!pause)
      setTimer((timer) => {
        return timer - 1;
      });
  };

  useEffect(() => {
    setStateDataText();
    const interval = setInterval(() => {
      setStateDataText();
      timerRun();
    }, 1000);
    return () => {
      clearInterval(interval);
      changeTimerValue(id, timer);
    };
  }, [pause, timer]);

  const setTaskValue = (event) => {
    setValue(event.target.value);
  };

  const timerSet = () => {
    if (timer < 0) return '00:00';
    return `${Math.floor(timer / 60)
      .toString()
      .padStart(2, '0')}:${Math.floor(timer % 60)
      .toString()
      .padStart(2, '0')}`;
  };

  const onPlay = () => {
    setPause(false);
  };

  const onPause = () => {
    setPause(true);
  };

  return edit ? (
    <li className="editing">
      <form onSubmit={onSubmitEdit}>
        <input className="edit" type="text" defaultValue={value} onChange={setTaskValue} autoFocus />
      </form>
    </li>
  ) : (
    <li className={classNames(null, { completed: completed })}>
      <div className="view">
        <input id={id} className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed} />
        <label htmlFor={id}>
          <span className="title">{task}</span>
          <div className="description">
            <button className="icon icon-play" onClick={onPlay}></button>
            <button className="icon icon-pause" onClick={onPause}></button>
            <span className="timer">{timerSet()}</span>
          </div>
          <span className="created">created {dataText} ago</span>
        </label>
        <button className="icon icon-edit" onClick={editTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    </li>
  );
}

Task.defaultProps = {
  onToggleCompleted: () => {},
  onSubmitEdit: () => {},
  onDeleted: () => {},
  editTask: () => {},
  changeTimerValue: () => {},
  timerProp: 0,
  time: new Date(),
};
Task.propTypes = {
  onToggleCompleted: PropTypes.func,
  onSubmitEdit: PropTypes.func,
  onDeleted: PropTypes.func,
  editTask: PropTypes.func,
  changeTimerValue: PropTypes.func,
  timerProp: PropTypes.number,
  time: PropTypes.object,
};
