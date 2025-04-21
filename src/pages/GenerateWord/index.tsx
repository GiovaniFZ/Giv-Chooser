import { Button } from '../../components/Button';
import { CheckboxContainer, Input, InputCheckbox, InputWord } from '../../components/Input';
import { WordsFieldsContainer } from './styles';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ShowError } from '../../components/Error';
import { useState } from 'react';
export function GenerateWord() {
  const navigate = useNavigate();
  const paramsWordSchema = z
    .object({
      count: z.number().min(1, { message: 'count should be greater than 0!' }),
      words: z.array(z.string()),
      no_repeat: z.boolean().default(false),
    })
    .refine((data) => data.words.length >= data.count, {
      message: 'Number of words should be greater than or equal to the number of words',
      path: ['words'],
    });

  type ParamWords = z.infer<typeof paramsWordSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParamWords>({
    resolver: zodResolver(paramsWordSchema),
  });
  const [numberOfWords, setNumberOfWords] = useState(0);
  function handleWordsValues(data: ParamWords) {
    navigate('/result', { state: data });
  }

  return (
    <form onSubmit={handleSubmit(handleWordsValues)}>
      <h1>
        <FontAwesomeIcon icon={faDice} style={{ paddingBottom: '20px' }} />
        <br />
        Words Chooser
      </h1>
      <h2>
        Choose
        <Input
          style={{ margin: '10px' }}
          type="number"
          {...register('count', {
            valueAsNumber: true,
          })}
        />
        word(s) among these
        <Input style={{ margin: '10px' }} type="number" onChange={(e) => setNumberOfWords(Number(e.target.value))} />
        word(s):
      </h2>
      {errors.count && <ShowError error={errors.count.message} />}
      <WordsFieldsContainer>
        {Array.from({ length: numberOfWords }).map((_, index) => (
          <InputWord required key={index} placeholder="Type any word" {...register(`words.${index}`)} />
        ))}
      </WordsFieldsContainer>
      <CheckboxContainer>
        <InputCheckbox type="checkbox" {...register('no_repeat')} />
        <label htmlFor="no_repeat">No repeat</label>
      </CheckboxContainer>
      <Button type="submit">
        <FontAwesomeIcon icon={faShuffle} style={{ paddingRight: '7px' }} />
        Draw!
      </Button>
    </form>
  );
}
