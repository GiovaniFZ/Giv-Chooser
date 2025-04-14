import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';

type ErrorProps = {
  error: string | undefined;
};

export function ShowError({ error }: ErrorProps) {
  return <p style={{ color: 'red' }}>Error: {error}</p>;
}

export function ShowErrorComponent({ error }: ErrorProps) {
  const navigate = useNavigate();
  return (
    <div>
      <h1 style={{ color: 'red' }}>An error occurred! Please, Try again.</h1>
      {error && <ShowError error={error} />}
      <Button
        onClick={() => {
          navigate('/');
        }}
      >
        Return to home
      </Button>
    </div>
  );
}
