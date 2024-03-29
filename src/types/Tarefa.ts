type Progresso = {
    cumprido?: number;
    total: number;
    tipo?: string
}

export type TarefaEditaveis = {
    nome: string;
    progresso?: Progresso;
    'data-recorrente'?: number[]
    data: string
    tipoDoEvento: 'dia' | 'intervalo-em-diante'
}

export type Tarefa = {
    id: string
    nome: string;
    tipo: Cotiano | CompromissoAgendado | Ocasional;
    modelo?: Pessoal | Trabalho | Casa;
    data: string;
    progresso?: Progresso;
    'data-recorrente'?: number[]
    progressoPorData?: { [date: string]: number },
    terminoPorData?: { [date: string]: boolean },
    terminado: boolean;
}

type Cotiano = 1
type CompromissoAgendado = 2
type Ocasional = 3

type Pessoal = 1
type Trabalho = 2
type Casa = 3
