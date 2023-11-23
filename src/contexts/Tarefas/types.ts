import { Dayjs } from 'dayjs'
import type { Tarefa } from 'types/Tarefa'
import type { Editar } from 'types/Editar'

export type TarefasContext = {
    dia: Dayjs
    tarefas: Tarefa[]
    setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>
    setDia: React.Dispatch<React.SetStateAction<Dayjs>>
    edicoesCotidiano: Editar[]
    setEdicoesCotidiano: React.Dispatch<React.SetStateAction<Editar[]>>
}