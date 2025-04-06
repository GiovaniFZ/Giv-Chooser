import { faArrowsRotate, faDice, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { z } from "zod";
import { Input, InputField } from "../../components/Input";
import { Button } from "../../components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ShowError } from "../../components/Error";

export function GenerateNumber() {
  const navigate = useNavigate()
  const paramsNumberSchema = z.object({
    max: z.number().min(0, { message: "max should be greater than 0!" }),
    min: z.number().min(0, { message: "min should be greater than 0!" }),
    count: z.number().min(1, { message: "count should be greater than 0!" }),
  }).refine((data) => data.max > data.min, {
    message: "max should be greater than min!",
    path: ["max"]
  })

  type ParamsNumber = z.infer<typeof paramsNumberSchema>
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ParamsNumber>({
    defaultValues: {
      max: 0,
      min: 0,
      count: 0
    },
    resolver: zodResolver(paramsNumberSchema),
  });

  const handleSubmitValues = async (data: ParamsNumber) => {
    navigate("/result", { state: data });
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
          Numbers Chooser
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
        {errors.count && <ShowError error={errors.count.message} />}
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
        {errors.min && <ShowError error={errors.min.message} />}
        {errors.max && <ShowError error={errors.max.message} />}
        <Button type="submit">
          <FontAwesomeIcon
            icon={faShuffle}
            style={{ paddingRight: "7px" }}
          />
          Draw!
        </Button>
        <Button
          onClick={() => {
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