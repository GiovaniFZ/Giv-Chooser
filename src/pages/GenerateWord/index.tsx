import { Button } from "../../components/Button";
import { Input, InputWord } from "../../components/Input";
import { WordsFieldsContainer } from "./styles";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDice, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ShowError } from "../../components/Error";
export function GenerateWord() {
    const navigate = useNavigate()
    const paramsWordSchema = z.object({
        count: z.number().min(1, { message: "count should be greater than 0!" }),
        words: z.array(z.string())
    }).refine((data) => data.words.length >= data.count, {
        message: "Number of words should be greater than or equal to the number of words",
        path: ["words"]
    })

    type ParamWords = z.infer<typeof paramsWordSchema>
    const { register, handleSubmit, control, formState: { errors } } = useForm<ParamWords>({
        resolver: zodResolver(paramsWordSchema),
    });
    const count = useWatch({
        control,
        name: "count",
        defaultValue: 0,
    });
    function handleWordsValues(data: ParamWords) {
        navigate("/result", { state: data })
    }

    return (
        <form onSubmit={handleSubmit(handleWordsValues)}>
            <h1>
                <FontAwesomeIcon
                    icon={faDice}
                    style={{ paddingBottom: "20px" }}
                />
                <br />
                Sort Words</h1>
            <h2>How many words do you want to shuffle?</h2>
            <Input type="number" {...register('count', {
                valueAsNumber: true
            })}>
            </Input>
            {errors.count && <ShowError error={errors.count.message} />}
            <WordsFieldsContainer>
                {Array.from({ length: count }).map((_, index) => (
                    <InputWord
                        required
                        key={index}
                        placeholder="Type any word"
                        {...register(`words.${index}`)}
                    />
                ))}
            </WordsFieldsContainer>
            <Button type="submit">
                <FontAwesomeIcon
                    icon={faShuffle}
                    style={{ paddingRight: "7px" }}
                />
                Draw!
            </Button>
        </form>
    )
}