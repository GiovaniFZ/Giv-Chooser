type ErrorProps = {
    error: string | undefined
}

export function ShowError({ error }: ErrorProps) {
    return (
        <p style={{ color: "red" }}>Error: {error}</p>
    )
}
