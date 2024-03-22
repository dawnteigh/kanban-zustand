import React from 'react'
import classNames from 'classnames';
import './Task.css';
import { useStore } from '../store';
import { FaTrashAlt } from "react-icons/fa";


const Task = ({ id }) => {

  const task = useStore(store => store.tasks.find(task => task.id === id))
  const deleteTask = useStore(store => store.deleteTask)
  const setDraggedTask = useStore(store => store.setDraggedTask)

  return (
    <div className='task' draggable onDragStart={() => setDraggedTask(task.id)}>
      <div>{task.title}</div>
      <div className='bottomWrapper'>
        <div onClick={() => deleteTask(task.id)} className='trash'><FaTrashAlt /></div>
        <div className={classNames('status', task.state)}>{task.state}</div>
      </div>
    </div>
  )
}

export default Task