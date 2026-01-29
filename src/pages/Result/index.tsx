import { ShowNumber } from '../../components/ShowNumber';
import { useLocation } from 'react-router-dom';
import { ShowWords } from '../../components/ShowWords';
import { useTranslation } from 'react-i18next';

export function Result() {
  const location = useLocation();
  const data = location.state;
  const isNumbers = !!data.max;

  const { t } = useTranslation();

  if (!data) {
    return (
      <div>
        <h1>{t('noData')}</h1>
      </div>
    );
  }

  if (isNumbers) {
    return (
      <div style={{ marginTop: '80px' }}>
        <h1>{t('choosenNumbers')}</h1>
        <ShowNumber max={data.max} min={data.min} count={data.count} no_repeat={data.no_repeat} />
      </div>
    );
  }

  return (
    <div style={{ marginTop: '80px' }}>
      <h1>{t('choosenWords')}</h1>
      <ShowWords words={data.words} count={data.count} no_repeat={data.no_repeat} />
    </div>
  );
}
