import React from 'react'
import classNames from 'classnames';
import './Task.css';
import { useStore } from '../store';
import { FaTrashAlt } from "react-icons/fa";


const Task = ({ title }) => {

  const task = useStore(store => store.tasks.find(task => task.title === title))
  const deleteTask = useStore(store => store.deleteTask)
  const setDraggedTask = useStore(store => store.setDraggedTask)

  return (
    <div className='task' draggable onDragStart={() => setDraggedTask(task.title)}>
      <div>{task.title}</div>
      <div className='bottomWrapper'>
        <div onClick={() => deleteTask(task.title)} className='trash'><FaTrashAlt /></div>
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </div>
  )
}

export default Task