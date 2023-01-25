import React, { useState } from 'react';
import classNames from 'classnames';
import './TasksFilter.css';
const TaskFilter = ({ setFilter }) => {
  const [active, setActive] = useState('All');

  const filters = [{ name: 'All' }, { name: 'Active' }, { name: 'Completed' }];
  const liFilters = filters.map((el, index) => (
    <li key={index}>
      <button
        className={classNames(null, { selected: active === el.name })}
        onClick={() => {
          setFilter(el.name);
          setActive(el.name);
        }}
      >
        {el.name}
      </button>
    </li>
  ));
  return <ul className="filters">{liFilters}</ul>;
};

export default TaskFilter;
