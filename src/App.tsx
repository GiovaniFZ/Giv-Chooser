import { useState } from 'react'
import './App.css'
import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';

export function App() {

  const [showNumber, setShowNumber] = useState(false);
  const [minNumber, setMinNumber] = useState(0);
  const [maxNumber, setMaxNumber] = useState(0);

  function getGeneratedNumber() {
    const generatedNumber = Math.floor(Math.random() * (maxNumber+1 - minNumber) + minNumber);
    return generatedNumber;
  }

  function handleClick() {
    setShowNumber(true);
  }

  return (
    <>
      <h1>Giv's raffle</h1>
      <div className='inputNums'>
        <Input
          type='number'
          onChange={(e) => setMinNumber(parseInt(e.target.value))}
          value={minNumber}
        />
        <Input
          type='number'
          onChange={(e) => setMaxNumber(parseInt(e.target.value))}
          value={maxNumber} />
      </div>
      <p>Click on the button below to draw a number</p>
      {showNumber && (
        <div>
          <h2>Drawn number:</h2>
          <h1>{getGeneratedNumber()}</h1>
        </div>
      )}
      <Button onClick={() => handleClick()}>Draw!</Button>
    </>
  )
}
