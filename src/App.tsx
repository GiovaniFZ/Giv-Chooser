import { useState } from 'react'
import './App.css'

export function App() {

  const [showNumber, setShowNumber] = useState(false);
  const generatedNumber = Math.floor(Math.random() * (11- 0) + 0);

  function handleClick(){
    setShowNumber(true);
  }

  return (
    <>
    <h1>Giv's drawer</h1>
    <p>Click on the button below to draw a number</p>
    {showNumber && (
      <div>
        <h2>Generated number:</h2>
        <h1>{generatedNumber}</h1>
      </div>
    )}
    <button onClick={() => handleClick()}>Draw!</button>
    </>
  )
}

export default App
