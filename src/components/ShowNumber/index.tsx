import { useQuery } from '@tanstack/react-query';
import { GetNumbers } from '../../api/getNumbers';
import { z } from 'zod';
import { GenNumberField, GenNumberFieldMargin, NumbersContainer, SmallNumbersContainer } from '../GenNumberField';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';
import { ShowErrorComponent } from '../Error';
import { useTranslation } from 'react-i18next';

const _paramsNumberSchema = z.object({
  max: z.number(),
  min: z.number(),
  count: z.number(),
  no_repeat: z.boolean(),
});

type ParamsNumber = z.infer<typeof _paramsNumberSchema>;

export function ShowNumber({ max, min, count, no_repeat }: ParamsNumber) {
  const navigate = useNavigate();
  const {
    data: genNumbers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['gen_number', count, max, min, no_repeat],
    queryFn: () => GetNumbers({ max, min, count, no_repeat }),
  });

  const { t } = useTranslation();

  if (isLoading) {
    return <h1>{t('loading')}</h1>;
  }

  if (error) {
    return <ShowErrorComponent error={error.message} />;
  }

  if (!genNumbers) {
    return <h1>Something went wrong!</h1>;
  }

  if (genNumbers.length < 4) {
    return (
      <>
        <SmallNumbersContainer>
          {Array.from({ length: count }).map((_, i) => (
            <GenNumberField key={i}>{genNumbers[i]}</GenNumberField>
          ))}
        </SmallNumbersContainer>
        <Button
          onClick={() => {
            navigate('/');
          }}
        >
          Choose again!
        </Button>
      </>
    );
  }

  return (
    <>
      <NumbersContainer>
        {Array.from({ length: count }).map((_, i) => (
          <GenNumberFieldMargin key={i}>{genNumbers[i]}</GenNumberFieldMargin>
        ))}
      </NumbersContainer>
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        Choose again!
      </Button>
    </>
  );
}
