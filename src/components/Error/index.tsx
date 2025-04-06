import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

type ErrorProps = {
    error: string | undefined
}

const navigate = useNavigate();

export function ShowError({ error }: ErrorProps) {
    return (
        <p style={{ color: "red" }}>Error: {error}</p>
    )
}

export function ShowErrorComponent() {
    return (
        <div>
            <h1 style={{ color: "red" }}>An error occurred! Please, Try again.</h1>
            <Button
                onClick={() => {
                    navigate("/");
                }}
            >
                Return to home
            </Button>
        </div>
    )
}
