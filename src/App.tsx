import { useState } from 'react'
import './App.css'
import { Button } from './components/Button/Button';
import { Input, InputField } from './components/Input/Input';

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
      <p>Choose a number between</p>
      <InputField>
        <Input
          type='number'
          onChange={(e) => setMinNumber(parseInt(e.target.value))}
          value={minNumber}
        />
        <p>and</p>
        <Input
          type='number'
          onChange={(e) => setMaxNumber(parseInt(e.target.value))}
          value={maxNumber} />
      </InputField>
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
