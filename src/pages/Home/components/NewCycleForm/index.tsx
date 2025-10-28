import { zodResolver } from "@hookform/resolvers/zod";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles";
import { useForm } from "react-hook-form";
import zod from "zod";


const newCycleFormValidationSchema = zod.object({
    task: zod.string()
        .min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser de no minímo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>


export function NewCycleForm() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 5
        }
    });

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="task-suggestions"
                disabled={!!activeCycle}
                {...register('task')}
            />

            <datalist id="task-suggestions">
                <option value="" />
            </datalist>


            <label htmlFor="">durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00:00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register("minutesAmount", { valueAsNumber: true })}
            />

            <span>minutos.</span>
        </FormContainer>
    )
}