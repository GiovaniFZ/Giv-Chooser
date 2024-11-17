import { ChangeEvent, SetStateAction, useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Input, InputField } from './components/Input/Input';

export function App() {
  const [showNumber, setShowNumber] = useState(false);
  const [minNumber, setMinNumber] = useState('');
  const [maxNumber, setMaxNumber] = useState('');
  const [error, setError] = useState('');
  const [generatedNumber, setGeneratedNumber] = useState(0);

  function validateInputs() {
    const min = parseInt(minNumber);
    const max = parseInt(maxNumber);

    if (isNaN(min) || isNaN(max)) {
      setError('Please enter valid numbers');
      return false;
    }
    if (min > max) {
      setError("Min number can't be more than max number");
      return false;
    }
    setError('');
    return true;
  }

  function getGeneratedNumber() {
    const min = parseInt(minNumber);
    const max = parseInt(maxNumber);

    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (validateInputs()) {
      setGeneratedNumber(getGeneratedNumber());
      setShowNumber(true);
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>, setter: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void; }) {
    setter(e.target.value);
    setError('');
  }

  return (
    <>
      <header>
        <h1>Giv's Raffle</h1>
        <p>Choose a number between:</p>
      </header>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputField>
          <Input
            type="number"
            placeholder="Num1"
            onChange={(e) => handleInputChange(e, setMinNumber)}
            value={minNumber}
            aria-label="Minimum number"
          />
          <p>and</p>
          <Input
            type="number"
            placeholder="Num2"
            onChange={(e) => handleInputChange(e, setMaxNumber)}
            value={maxNumber}
            aria-label="Maximum number"
          />
        </InputField>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {showNumber && (
          <div>
            <h2>Drawn number:</h2>
            <h1>{generatedNumber}</h1>
          </div>
        )}
        <Button type="submit" disabled={!!error}>
          Draw!
        </Button>
      </form>
      <Button
        onClick={() => {
          setMinNumber('');
          setMaxNumber('');
          setShowNumber(false);
          setError('');
        }}
      >
        Reset
      </Button>
    </>
  );
}