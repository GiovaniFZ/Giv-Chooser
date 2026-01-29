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
import { useTranslation } from 'react-i18next';
export function GenerateWord() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const paramsWordSchema = z
    .object({
      count: z.number().min(1, { message: t('countShouldBeGreaterThanZero') }),
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
        <FontAwesomeIcon icon={faDice} style={{ paddingBottom: '20px', marginTop: '50px' }} />
        <br />
        {t('wordsChooser')}
      </h1>
      <h2>
        {t('choose')}
        <Input
          style={{ margin: '10px' }}
          type="number"
          {...register('count', {
            valueAsNumber: true,
          })}
        />
        {t('wordsAmong')}
        <Input style={{ margin: '10px' }} type="number" onChange={(e) => setNumberOfWords(Number(e.target.value))} />
        {t('words')}
      </h2>
      {errors.count && <ShowError error={errors.count.message} />}
      <WordsFieldsContainer>
        {Array.from({ length: numberOfWords }).map((_, index) => (
          <InputWord required key={index} placeholder={t('typeAnyWord')} {...register(`words.${index}`)} />
        ))}
      </WordsFieldsContainer>
      <CheckboxContainer>
        <InputCheckbox type="checkbox" {...register('no_repeat')} />
        <label htmlFor="no_repeat">{t('noRepeat')}</label>
      </CheckboxContainer>
      <Button type="submit">
        <FontAwesomeIcon icon={faShuffle} style={{ paddingRight: '7px' }} />
        {t('draw')}
      </Button>
    </form>
  );
}
