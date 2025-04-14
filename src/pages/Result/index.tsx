import { ShowNumber } from '../../components/ShowNumber';
import { useLocation } from 'react-router-dom';
import { ShowWords } from '../../components/ShowWords';

export function Result() {
  const location = useLocation();
  const data = location.state;
  const isNumbers = !!data.max;

  if (!data) {
    return (
      <div>
        <h1>No data available</h1>
      </div>
    );
  }

  if (isNumbers) {
    return (
      <>
        <h1>The chosen numbers are:</h1>
        <ShowNumber max={data.max} min={data.min} count={data.count} no_repeat={data.no_repeat} />
      </>
    );
  }

  return (
    <>
      <h1>The chosen words are:</h1>
      <ShowWords words={data.words} count={data.count} />
    </>
  );
}
