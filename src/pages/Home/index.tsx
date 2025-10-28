import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountdownButton, StopCountdownButton } from "./styles";
import { createContext, useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/CountDown";


interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date
    interruptedDate?: Date,
    finishedDate?: Date
}

interface CyclesContextDate {
    activeCycle: Cycle | undefined;
    acticeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;

}

// estou na aula 58


export const cyclesContext = createContext({} as CyclesContextDate);

export function Home() {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function markCurrentCycleAsFinished(cycleId: string) {
        setCycles((state) => state
            .map((cycle) => {
                if (cycle.id === cycleId) {
                    return {
                        ...cycle,
                        finishedDate: new Date()
                    }
                }

                return cycle;
            }))


    }



    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime());


        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        };

        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);

        reset();
    }

    function handleStopCycle() {
        setActiveCycleId(null);
        setCycles(cycles.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return {
                    ...cycle,
                    interruptedDate: new Date()
                }
            }

            return cycle;
        }))
    }


    const task = watch('task');
    const isSubmitDisabled = !task;



    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <cyclesContext.Provider value={{ activeCycle, acticeCycleId, markCurrentCycleAsFinished() }}>
                    <NewCycleForm />
                    <Countdown
                    />

                </cyclesContext.Provider>


                {activeCycle ? (
                    <StopCountdownButton
                        type="button"
                        onClick={handleStopCycle}
                    >
                        <HandPalm size={24} />
                        Parar
                    </StopCountdownButton>) : (
                    <StartCountdownButton
                        type="submit"
                        disabled={isSubmitDisabled}
                    >
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>

                )}
            </form>

        </HomeContainer>
    )
}