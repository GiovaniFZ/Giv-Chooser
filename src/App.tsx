import { useState } from 'react'
import './App.css'
import { Button } from './components/Button/Button';
import { Input, InputField } from './components/Input/Input';
import * as z from 'zod'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

export function App() {

  const [showNumber, setShowNumber] = useState(false);
  const [generatedNumber, setGeneratedNumber] = useState(0);
  const { register } = useForm();
  
  const newRaffleSchema = z.object({
    minNumber: z.number().min(0, 'Number should be greater or equal to 0.'),
    maxNumber: z.number().min(0, 'Number should be greater or equal to 0.'),
  })

  function handleSubmitValues() {
    const { minNumber, maxNumber } = newRaffleForm.getValues();
    console.log(minNumber);
    console.log(maxNumber);
    const number = Math.floor(Math.random() * (maxNumber +1 - minNumber) + minNumber);
    setGeneratedNumber(number);
    setShowNumber(true);
  }

  type RaffleSchema = z.infer<typeof newRaffleSchema>;

  const newRaffleForm = useForm<RaffleSchema>({
    resolver: zodResolver(newRaffleSchema),
    defaultValues: {
      minNumber: 0,
      maxNumber: 0,
    }
  })

  const { handleSubmit } = newRaffleForm;

  return (
    <>
      <h1>Giv's raffle</h1>
      <p>Choose a number between</p>
      <FormProvider {...newRaffleForm}>
      <form onSubmit={handleSubmit(handleSubmitValues)}>
      <InputField>
        <Input
          type='number'
          {...register('minNumber', { valueAsNumber: true })}
        />
        <p>and</p>
        <Input
          type='number'
          {...register('maxNumber', { valueAsNumber: true })}
          />
      </InputField>
      {showNumber && (
        <div>
          <h2>Drawn number:</h2>
          <h1>{generatedNumber}</h1>
        </div>
      )}
      <Button type="submit">Draw!</Button>
      </form>
      </FormProvider>
    </>
  )
}
