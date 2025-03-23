import { useState } from 'react';
import './App.css';
import { Button } from './components/Button';
import { Input, InputField } from './components/Input';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faShuffle, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { zodResolver } from "@hookform/resolvers/zod";
import { ShowNumber } from './components/ShowNumber';

export function App() {

  const paramsNumberSchema = z.object({
    max: z.number(),
    min: z.number(),
    count: z.number(),
  }).refine((data) => data.max > data.min, {
    message: "max should be greater!",
  })

  type ParamsNumber = z.infer<typeof paramsNumberSchema>

  const defaultFormState = {
    min: 0,
    max: 0,
    count: 0
  }

  const [showNumber, setShowNumber] = useState(false);
  const [formState, setFormState] = useState(defaultFormState);
  const { register, handleSubmit, reset } = useForm<ParamsNumber>({
    resolver: zodResolver(paramsNumberSchema),
  });

  const handleSubmitValues = (data: ParamsNumber) => {
    const { min, max, count } = data;
    setFormState({ min, max, count })
    setShowNumber(true);
  }

  return (
    <>
      <header>
        <h1>
          <FontAwesomeIcon
            icon={faDice}
            style={{ paddingBottom: "20px" }}
          />
          <br />
          Giv's Shuffler
        </h1>
      </header>
      <form onSubmit={handleSubmit(handleSubmitValues)}>
        <p>Choose
          <Input
            type='number'
            {...register('count', { valueAsNumber: true })}
            style={{ marginLeft: "15px", marginRight: "15px" }}
          />
          number(s) between:
        </p>
        <InputField>
          <Input
            type="number"
            placeholder="Min"
            aria-label="Minimum number"
            {...register('min', { valueAsNumber: true })}
          />
          <p>and</p>
          <Input
            type="number"
            placeholder="Max"
            aria-label="Maximum number"
            {...register('max', { valueAsNumber: true })}
          />
        </InputField>
        {showNumber && (
          <ShowNumber max={formState.max} min={formState.min} count={formState.count} />
        )}
        <Button type="submit">
          <FontAwesomeIcon
            icon={faShuffle}
            style={{ paddingRight: "7px" }}
          />
          Draw!
        </Button>
        <Button
          onClick={() => {
            setShowNumber(false);
            reset();
          }}
        >
          <FontAwesomeIcon
            icon={faArrowsRotate}
            style={{ paddingRight: "7px" }}
          />
          Reset
        </Button>
      </form>
    </>
  );
}