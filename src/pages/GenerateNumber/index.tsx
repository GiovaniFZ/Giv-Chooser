import { faArrowsRotate, faDice, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { z } from 'zod';
import { CheckboxContainer, Input, InputCheckbox, InputField } from '../../components/Input';
import { Button } from '../../components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ShowError } from '../../components/Error';
import { useTranslation } from 'react-i18next';

export function GenerateNumber() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const paramsNumberSchema = z
    .object({
      max: z.number().min(0, { message: 'max should be greater than 0!' }),
      min: z.number().min(0, { message: 'min should be greater than 0!' }),
      count: z.number().min(1, { message: 'count should be greater than 0!' }),
      no_repeat: z.boolean().default(false),
    })
    .refine((data) => data.max > data.min, {
      message: 'max should be greater than min!',
      path: ['max'],
    })
    .refine((data) => !data.no_repeat || data.max - data.min >= data.count, {
      message: 'if you want to repeat, max - min should be greater than count!',
      path: ['no_repeat'],
    });

  type ParamsNumber = z.infer<typeof paramsNumberSchema>;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParamsNumber>({
    defaultValues: {
      max: 0,
      min: 0,
      count: 0,
      no_repeat: false,
    },
    resolver: zodResolver(paramsNumberSchema),
  });

  const handleSubmitValues = async (data: ParamsNumber) => {
    navigate('/result', { state: data });
  };

  return (
    <>
      <header>
        <h1>
          <FontAwesomeIcon icon={faDice} style={{ paddingBottom: '20px' }} />
          <br />
          {t('numbersChooser')}
        </h1>
      </header>
      <form onSubmit={handleSubmit(handleSubmitValues)}>
        <p>
          {t('choose')}
          <Input
            type="number"
            {...register('count', { valueAsNumber: true })}
            style={{ marginLeft: '15px', marginRight: '15px' }}
          />
          {t('numbersBetween')}
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
        <CheckboxContainer>
          <InputCheckbox type="checkbox" {...register('no_repeat')} />
          <label htmlFor="no_repeat">{t('noRepeat')}</label>
        </CheckboxContainer>
        {errors.min && <ShowError error={errors.min.message} />}
        {errors.max && <ShowError error={errors.max.message} />}
        {errors.no_repeat && <ShowError error={errors.no_repeat.message} />}
        <div>
          <Button type="submit">
            <FontAwesomeIcon icon={faShuffle} style={{ paddingRight: '7px' }} />
            {t('draw')}
          </Button>
          <Button
            onClick={() => {
              reset();
            }}
          >
            <FontAwesomeIcon icon={faArrowsRotate} style={{ paddingRight: '7px' }} />
            {t('reset')}
          </Button>
        </div>
      </form>
    </>
  );
}
