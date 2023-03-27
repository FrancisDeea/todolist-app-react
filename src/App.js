import './App.css';
import { useState } from 'react';

export default function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [tab, setTab] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  
  function handleEnter(e) {
    const key = e.key;
    if (key === "Enter") {
      console.log(key)
    }
  }

  return (
    <div>
      <InputTask 
        input={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      <List />
    </div>
  )
}

function InputTask({input, onChange, onKeyDown}) {

  return (
    <input
      className="input-task"
      type="text"
      value={input}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder="Type a new task!"
      autoComplete="nope"
    />
  )
}

