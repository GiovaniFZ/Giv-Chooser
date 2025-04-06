import { ShowNumber } from "../../components/ShowNumber";
import { useLocation } from "react-router-dom";
import { ShowWords } from "../../components/ShowWords";

export function Result() {
    const location = useLocation();
    const data = location.state;

    if (!data) {
        return (
            <div>
                <h1>No data available</h1>
            </div>
        );
    }

    const isNumbers = !!data.max

    if (isNumbers) {
        return (
            <>
                <h1>Results</h1>
                <ShowNumber
                    max={data.max}
                    min={data.min}
                    count={data.count}
                />
            </>
        )
    }

    return (
        <>
            <h1>Results</h1>
            <ShowWords
                words={data.words}
                count={data.count}
            />
        </>
    );
}
