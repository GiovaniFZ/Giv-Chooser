import { faArrowsRotate, faDice, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { Input, InputField } from "../../components/Input";
import { ShowNumber } from "../../components/ShowNumber";
import { Button } from "../../components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function GenerateNumber() {
  const paramsNumberSchema = z.object({
    max: z.number(),
    min: z.number(),
    count: z.number(),
  }).refine((data) => data.max > data.min, {
    message: "max should be greater!",
  })

  type ParamsNumber = z.infer<typeof paramsNumberSchema>

  const [showNumber, setShowNumber] = useState(false);
  const [formValues, setFormValues] = useState<ParamsNumber | null>(null);
  const { register, handleSubmit, reset } = useForm<ParamsNumber>({
    defaultValues: {
      max: 0,
      min: 0,
      count: 0
    },
    resolver: zodResolver(paramsNumberSchema),
  });

  const handleSubmitValues = (data: ParamsNumber) => {
    setFormValues(data);
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
        {showNumber && formValues && (
          <ShowNumber
            max={formValues.max}
            min={formValues.min}
            count={formValues.count}
          />
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
            setFormValues(null);
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