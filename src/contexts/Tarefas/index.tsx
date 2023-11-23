import { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { createContext } from "use-context-selector";
import dayjs from "dayjs";

import type { Tarefa } from 'types/Tarefa'
import type { Editar } from 'types/Editar'
import type { TarefasContext } from './types'

const tarefasContext = createContext<TarefasContext>({} as any)

export function Provider({ children }: PropsWithChildren) {
    const [dia, setDia]= useState(dayjs(new Date()))
    const tarefasSalvasStorage = JSON.parse(localStorage.getItem("tarefas") || '[]')
    const [tarefas, setTarefas]= useState<Tarefa []>(tarefasSalvasStorage)
    const edicoesCotidianoSalvasStorage = JSON.parse(localStorage.getItem("edicoesCotidiano") || '[]')
    const [edicoesCotidiano, setEdicoesCotidiano]= useState<Editar[]>(edicoesCotidianoSalvasStorage)

    useEffect(() => {
        if (tarefas?.length) {
          localStorage.setItem("tarefas", JSON.stringify(tarefas))
        }
    }, [tarefas])

    useEffect(() => { 
        if (edicoesCotidiano?.length) {
            localStorage.setItem("edicoesCotidiano", JSON.stringify(edicoesCotidiano))
        }
    }, [edicoesCotidiano])

    return (
        <tarefasContext.Provider value={{ dia, setDia, tarefas, setTarefas, edicoesCotidiano, setEdicoesCotidiano }}>
            {children}
        </tarefasContext.Provider>
    )
}

export default tarefasContext