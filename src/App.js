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

  useEffect(() => {
    // Get the container element
    let container = document.querySelector(".app-container");
    // Set the height of the container element
    setHeight(container.scrollHeight);

    // If the height of the container element is greater than or equal to 60% of the window height,
    // set overflow property of container element to "auto"
    if (height >= (window.innerHeight * 0.60)) {
      container.style.overflow = "auto";
    }

    // If list has items, store them in local storage
    if (list.length > 0) {
      storage.setItem("list", JSON.stringify(list));
    } 
    // If list is empty and local storage has items, retrieve them
    else if (list.length === 0 && storage.length) {
      setList(JSON.parse(storage.getItem("list")))
    }

    console.log(storage)
  }, [list, height])


  return (
    <div
      className='app-container'
      style={{
        height: `${height}px`,
        transition: `height .3s ease`
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

