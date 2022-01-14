import './App.css';
import { useState, useEffect } from 'react';
import Todo from './Components/Todo/Todo'
import { Children } from 'react/cjs/react.production.min';


function App() {
  
  const [todo, setTodo] = useState(JSON.parse(window.localStorage.getItem('todo')) || [])
  const [renderType, setRenderType] = useState('all')
  const [completed, setCompleted] = useState([])
  const [uncompleted, setUncompleted] = useState([])
  const [alert, setAlert] = useState('')
  
  const handleDelete = (evt) => {
    const btnID = Number(evt.target.dataset.btnId);
    
    const filteredTodo = todo.filter(row => row.id !== btnID);
    
    setTodo([...filteredTodo]);
    
    window.localStorage.setItem('todo', JSON.stringify([...filteredTodo]))
  }
  
  const handleCheck = (evt) => {
    const checkID = Number(evt.target.dataset.checkId);
    
    const findTodo = todo.find(row => row.id === checkID)
    
    findTodo.isCompleted = !findTodo.isCompleted
    
    setTodo([...todo])
    
    window.localStorage.setItem('todo', JSON.stringify([...todo]))
  }
  
  function date() {
    let newData = new Date()
    
    let year = newData.getFullYear()
    let month = String(newData.getMonth() + 1).padStart(2, 0)
    let day = String(newData.getDate()).padStart(2, 0)
    let h = newData.getHours()
    let m = newData.getMinutes()
    let s = newData.getSeconds()
    
    return {year, month, day, h, m, s}
  }

  const {year, month, day, h, m, s} = date()
  
  return (
    <div className='container'>
    <h1 className='heading'>
    To-do list
    </h1>
    
    <div className='todo-area'>
    
    <div className='todo__design'>
    
    <time className='todo__year'>{day}/{month}/{year}</time>
    <time className='todo__clock'>{h}:{m}</time>
    <a className='todo__author-link' href='https://t.me/h_kobulov'>©Hikmatulloh</a>
    </div>

    <div className='todo__input-area'>
    <span className='todo__alert'>{alert}</span>
    
    <input className='todo__input' type="text" onKeyUp={(evt) => {
      if(evt.code === 'Enter' || evt.code === 'NumpadEnter'){
        const newTodo = {
          id: todo[todo.length - 1]?.id + 1 || 0,
          title: evt.target.value.trim(),
          isCompleted: false
        }
        
        if(evt.target.value){
          setTodo([...todo, newTodo])
          setAlert('')
          window.localStorage.setItem('todo', JSON.stringify([...todo, newTodo]))
          
        } else {
          setAlert("Iltimos, ma'lumot kiriting")
        }
        
        evt.target.value = null;
        
      }
      
      if(evt.code === 'Escape'){
        evt.target.value = null
      }
    }}/>
    </div>
   

    <div className='todo__box'>
    <div className='todo__buttons'>
    <button className='todo__btn-all' onClick={() => setRenderType('all')}>All <span className='todo__btn-all-count'>{todo.length > 0 ? `(${todo.length})` : null}</span></button>
    
    <div className='todo__mini-buttons'>
    <button className='todo__btn-comp' onClick={() => {
      setRenderType('completed')
      
      const filteretCompTodo = todo.filter(row => row.isCompleted)
      
      setCompleted(filteretCompTodo)
    }}>
    Completed <span className='todo__btn-all-count'>{completed.length > 0 ? `(${completed.length})` : null}</span>
    </button>
    
    <button className='todo__btn-comp' onClick={() => {
      setRenderType('uncompleted')
      
      const filteretUncompTodo = todo.filter(row => !row.isCompleted)
      
      setUncompleted(filteretUncompTodo)
    }}>
    Uncompleted <span className='todo__btn-all-count'>{uncompleted.length > 0 ? `(${todo.length - completed.length})` : null}</span>
    </button>
    </div>
    </div>
    
    
    <ul className='todo'>  
    {todo.length > 0 && renderType === 'all' && todo.map((row) => <Todo key={row.id} id={row.id} handleDelete={handleDelete} handleCheck={handleCheck} isCompleted={row.isCompleted}>
    {row.title}
    </Todo>)}
    
    {completed.length > 0 && renderType === 'completed' && completed.map((row) => <Todo key={row.id} id={row.id} handleDelete={handleDelete} handleCheck={handleCheck} isCompleted={row.isCompleted}>
    {row.title}
    </Todo>)}
    
    {uncompleted.length > 0 && renderType === 'uncompleted' && uncompleted.map((row) => <Todo key={row.id} id={row.id} handleDelete={handleDelete} handleCheck={handleCheck} isCompleted={row.isCompleted}>
    {row.title}
    </Todo>)}
    </ul>
    </div>
    </div>
    
    </div>
    )
  }
  
  export default App;
  