import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser de no minímo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

export function Home() {
    const { register, handleSubmit, watch, formState } = useForm({
        resolver: zodResolver(newCycleFormValidationSchema),
    });

    function handleCreateNewCycle(data: any) {
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                        list="task-suggestions"
                        {...register('task'), {
                            valueAsNumber: true
                        }}
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
                        {...register("minutesAmount")}
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton
                    type="submit"
                    disabled={isSubmitDisabled}
                >
                    <Play size={24} />
                    Começar
                </StartCountdownButton>

            </form>

        </HomeContainer>
    )
}