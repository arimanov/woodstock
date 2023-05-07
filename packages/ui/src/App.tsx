import { useState } from 'react'
import reactLogo from './assets/woodstock-logo.png'
import './App.css'
import { Account } from "@woodstock/common/Account";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={reactLogo} className="logo react" alt="Woodstock logo" />
        </a>
      </div>
      <h1>Woodstock</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
