import { ChangeEvent, SetStateAction, useState} from 'react';
import './App.css';
import {Button} from './components/Button/Button';
import {Input, InputField} from './components/Input/Input';

export function App() {
    const [showNumber, setShowNumber] = useState(false);
    const [minNumber, setMinNumber] = useState('');
    const [maxNumber, setMaxNumber] = useState('');
    const [error, setError] = useState('');
    const [generatedNumber, setGeneratedNumber] = useState(null);

    function validateInputs() {
        const min = parseInt(minNumber);
        const max = parseInt(maxNumber);

        if (isNaN(min) || isNaN(max)) {
            setError('Please enter valid numbers');
            return false;
        }
        if (min > max) {
            setError("Min number can't be more than max number");
            return false;
        }
        setError('');
        return true;
    }

    function getGeneratedNumber() {
        const min = parseInt(minNumber);
        const max = parseInt(maxNumber);

        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    function handleClick() {
        if (validateInputs()) {
            // @ts-ignore
            setGeneratedNumber(getGeneratedNumber());
            setShowNumber(true);
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>, setter: { (value: SetStateAction<string>): void; (value: SetStateAction<string>): void; (arg0: any): void; }) {
        setter(e.target.value);
        setShowNumber(false);
        setError('');
    }

    return (
        <>
            <header>
                <h1>Giv's Raffle</h1>
                <p>Choose a number between:</p>
            </header>
            <InputField>
                <Input
                    type="number"
                    placeholder="Min number"
                    onChange={(e) => handleInputChange(e, setMinNumber)}
                    value={minNumber}
                    aria-label="Minimum number"
                />
                <p>and</p>
                <Input
                    type="number"
                    placeholder="Max number"
                    onChange={(e) => handleInputChange(e, setMaxNumber)}
                    value={maxNumber}
                    aria-label="Maximum number"
                />
            </InputField>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {showNumber && (
                <div>
                    <h2>Drawn number:</h2>
                    <h1>{generatedNumber}</h1>
                </div>
            )}
            <Button onClick={handleClick} disabled={!!error}>
                Draw!
            </Button>
            <Button
                onClick={() => {
                    setMinNumber('');
                    setMaxNumber('');
                    setShowNumber(false);
                    setError('');
                    setGeneratedNumber(null);
                }}
            >
                Reset
            </Button>
        </>
    );
}