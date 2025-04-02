import { useState } from "react";
import { Button } from "../../components/Button";
import { Input, InputWord } from "../../components/Input";
import { WordsFieldsContainer } from "./styles";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShowWords } from "../../components/ShowWords";

export function GenerateWord() {
    const paramsWordSchema = z.object({
        count: z.number(),
        words: z.array(z.string())
    })

    const [showWords, setShowWords] = useState(false)
    type ParamWords = z.infer<typeof paramsWordSchema>
    const { register, handleSubmit, control } = useForm<ParamWords>({
        resolver: zodResolver(paramsWordSchema),
    });
    const count = useWatch({
        control,
        name: "count",
        defaultValue: 0,
    });
    const words = useWatch({
        control,
        name: "words",
        defaultValue: [],
    });
    function handleWordsValues() {
        setShowWords(true)
    }

    return (
        <form onSubmit={handleSubmit(handleWordsValues)}>
            <h1>Sort Words</h1>
            <h2>How many words do you want to shuffle?</h2>
            <Input type="number" {...register('count', {
                validate: (value) => value >= 0 || "Number can't be negative",
                valueAsNumber: true
            })}></Input>
            <WordsFieldsContainer>
                {Array.from({ length: count }).map((_, index) => (
                    <InputWord
                        key={index}
                        placeholder="type any word"
                        {...register(`words.${index}`)}
                    />
                ))}
            </WordsFieldsContainer>
            {showWords &&
                <ShowWords count={count} words={words} />
            }
            <Button type="submit">Submit!</Button>
        </form>
    )
}