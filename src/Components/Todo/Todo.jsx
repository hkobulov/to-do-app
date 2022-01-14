import { useState } from 'react';
import './Todo.scss';

function Todo({id, children, handleDelete, handleCheck, isCompleted}){
    
    return (
        <>
        <li data-todo-id={id} className='todo__item'>
        
        <input className='todo__check' checked={isCompleted} type={'checkbox'} onChange={handleCheck} data-check-id={id}/>
        
        
        <p className='todo__title'>{children}</p>
        
        <button className='todo__btn' data-btn-id={id} onClick={handleDelete}>DELETE</button>
        </li>
        </>
        )
    }
    export default Todo;