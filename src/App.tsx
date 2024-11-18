import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input, InputField } from './components/Input';
import { useForm } from 'react-hook-form';
import { GenNumberField } from './components/GenNumberField';

interface Data {
  minNumber: number,
  maxNumber: number,
  quantity: number,
}

export function App() {
  const [showNumber, setShowNumber] = useState(false);
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
      </header>
      <form onSubmit={handleSubmit(handleSubmitValues)}>
      <p>Choose
        <Input
          type='number'
          {...register('quantity', { valueAsNumber: true })}
          style={{marginLeft: "15px", marginRight: "15px"}}
        />
        number(s) between:
      </p>
        <InputField
          style={{marginTop: "25px"}}
        >
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
        {showNumber && (
          <div>
            <h2>Drawn number:</h2>
            <GenNumberField>{generatedNumber}</GenNumberField>
          </div>
        )}
        <Button
          type="submit"
          style={{marginTop: "35px"}}
        >
          Draw!
        </Button>
        <Button
          onClick={() => {
            setShowNumber(false);
            reset();
          }}
        >
          Reset
        </Button>
      </form>
    </>
  );
}