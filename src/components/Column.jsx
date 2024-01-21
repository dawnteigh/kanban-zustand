import React, { useState } from 'react';
import './Column.css';
import Task from './Task';
import { useStore } from '../store';
import classNames from 'classnames';

const Column = ({ state }) => {

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(store => store.tasks.filter(task => task.state === state))
  const addTask = useStore(store => store.addTask);
  const setDraggedTask = useStore(store => store.setDraggedTask);
  const draggedTask = useStore(store => store.draggedTask);
  const moveTask = useStore(store => store.moveTask);

  return (
    <div className={classNames('column', { drop: drop })}
      onDragOver={(e) => {
        e.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDrop(false);
      }}
      onDrop={() => {
        moveTask(draggedTask, state)
        setDraggedTask(null)
        setDrop(false);
      }
      }>
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task, i) => <Task key={i} title={task.title} />)}
      {open && <div className='Modal'>
        <div className='modalContent'>
          <input onChange={(e) => setText(e.target.value)} value={text} />
          <button onClick={() => {
            addTask(text, state)
            setText('')
            setOpen(false)
          }}>Submit</button>
        </div>
      </div>}
    </div>
  )
}

export default Column