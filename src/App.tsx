import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Input, InputField } from './components/Input/Input';
import { useForm } from 'react-hook-form';

interface Data {
  minNumber: number,
  maxNumber: number,
}

export function App() {
  const [showNumber, setShowNumber] = useState(false);
  const [error, setError] = useState('');
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const { register, handleSubmit, reset } = useForm<Data>();

  const handleSubmitValues = (data: Data) => {
    const {maxNumber, minNumber} = data;
    const number = Math.floor(Math.random() * (maxNumber + 1 - minNumber) + minNumber);
    setGeneratedNumber(number);
    setShowNumber(true);
  }

  return (
    <>
      <header>
        <h1>Giv's Raffle</h1>
        <p>Choose a number between:</p>
      </header>
      <form onSubmit={handleSubmit(handleSubmitValues)}>
        <InputField>
          <Input
            type="number"
            placeholder="Min"
            aria-label="Minimum number"
            {...register('minNumber', { valueAsNumber: true })}
          />
          <p>and</p>
          <Input
            type="number"
            placeholder="Max"
            aria-label="Maximum number"
            {...register('maxNumber', { valueAsNumber: true })}
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
          setShowNumber(false);
          reset();
        }}
      >
        Reset
      </Button>
    </>
  );
}