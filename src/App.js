import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [height, setHeight] = useState(0);
  const [tab, setTab] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const storage = localStorage;

  // Add new task when enter key is pressed
  function handleEnter(e) {
    const key = e.key;
    if (key === "Enter" && input) {
      setList([...list, input]);
      setInput("");
    }
  }

  // Update height of container when list changes
  useEffect(() => {
    let container = document.querySelector(".app-container");
    setHeight(container.scrollHeight);

    if (container.offsetHeight >= (window.innerHeight * 0.60)) {
      container.style.overflow = "auto";
    }
  }, [list])


  return (
    <div
      className='app-container'
      style={{
        height: `${height}px`,
        transition: `height .2s ease`
      }}
    >
      <InputTask
        input={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      <List list={list} />
    </div>
  )
}

function InputTask({ input, onChange, onKeyDown }) {

  return (
    <input
      className="input-task"
      type="text"
      value={input}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Type a new task and press enter!"
      autoComplete="nope"
    />
  )
}

function List({ list }) {
  let key = 0;
  // Map over list and create a new li element for each task
  const todo = list.map(task => {
    key++;
    return (
      <li key={key}>
        <input
          type="checkbox"
          id={key}
        />
        <label htmlFor={key}>{task}</label>
      </li>
    )
  })

  return (
    <ul>
      {todo}
    </ul>
  )
}

