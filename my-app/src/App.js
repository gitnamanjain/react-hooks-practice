import { useState, useRef } from 'react';
import { useEffect } from "react";
import './App.css';
import Todo from './Todo';
import axios from 'axios';
function App() {

  //creating a copy of json in list
  const [list, setList] = useState([])
  useEffect(() => {
    fetchData()
    axios.get(`http://localhost:3500/tasks`).then((res) => {
      setList(res.data);
    });
  }, [])

  //updating list  
  async function fetchData() {
    await axios.get(`http://localhost:3500/tasks`).then((res) => {
      setList(res.data);
    });
  }

  //controlling input of todo and adding to api
  const todo = useRef(null);
  const handleTodo = async (event) => {
    event.preventDefault();
    console.log(todo.current.value)
    await axios.post(`http://localhost:3500/tasks`, { todoItem: todo.current.value, id: Math.floor(Date.now() / (Math.random() * 10)) })
    fetchData();
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   await axios.post(`http://localhost:3500/tasks`, { todoItem: todo, id: Math.floor(Date.now() / (Math.random() * 10)) })
  //   fetchData();
  //   // setList([...list, {
  //   //   todoItem: todo, id: Math.floor(Date.now() / (Math.random() * 10))
  //   // }])
  // }

  //removing todo from api
  const handleDelete = async (incomid) => {
    await axios.delete(`http://localhost:3500/tasks/${incomid}`)
    fetchData();
    // const newList = list.filter((item) => item.id !== id);
    // setList(newList)
  }

  return (
    <>
      <div>
        <form action="">
          <label> Enter To Do</label>
          <input type="text" placeholder='Type Here' ref={todo} />
          <button onClick={handleTodo}>Add Todo</button>
        </form>
      </div>
      <Todo list={list} handleDelete={handleDelete}></Todo>
    </>
  );
}

export default App;
