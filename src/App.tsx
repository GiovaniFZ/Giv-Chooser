import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input, InputField } from './components/Input';
import { useForm } from 'react-hook-form';
import { GenNumberField } from './components/GenNumberField';
import { z } from 'zod'

export function App() {

  const genNumberSchema = z.object({
    maxNumber: z.number(),
    minNumber: z.number(),
    quantity: z.number(),
  }).refine((data) => data.maxNumber > data.minNumber, {
    message: "maxNumber should be greater!",
    path: ["maxNumber"]
  })

  type GenNumber = z.infer<typeof genNumberSchema>

  const [showNumber, setShowNumber] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const { register, handleSubmit, reset } = useForm<GenNumber>();

  const handleSubmitValues = (data: GenNumber) => {
    //const parser = genNumberSchema.safeParse(data);
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
      <p>Choose <Input type='number' {...register('quantity', { valueAsNumber: true })} /> number(s) between:</p>
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
        {showNumber && (
          <div>
            <h2>Drawn number:</h2>
            <GenNumberField>{generatedNumber}</GenNumberField>
          </div>
        )}
        <Button type="submit">
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