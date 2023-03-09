import React from "react";
import { useContextSelector } from 'use-context-selector'
import { Dayjs } from 'dayjs'
import { Typography } from 'antd';
import styled from 'styled-components'
import Component from 'components/Component';
import { diasDaSemana, meses } from 'utils/values'
import { Tarefa } from 'types/Tarefa'
import tarefaContext from 'contexts/Tarefas'

const { Title } = Typography;

const getTermino = (tarefa: Tarefa, diaSelecionadoFormatado: string) => {
  let terminado = false, progressoDoDia: number | undefined
  if (tarefa.progresso) {
    progressoDoDia = tarefa.tipo === 1 ? tarefa.progressoPorData?.[diaSelecionadoFormatado] : tarefa.progresso?.cumprido
    terminado = progressoDoDia === tarefa.progresso?.total
  }
  else {
    terminado = tarefa.tipo === 1 ? tarefa.terminoPorData?.[diaSelecionadoFormatado] || false : tarefa.terminado
  }
  return terminado
}

export function Lista() {
  const tarefas = useContextSelector(tarefaContext, ctx => ctx.tarefas)
  const setTarefas = useContextSelector(tarefaContext, ctx => ctx.setTarefas)
  const dia = useContextSelector(tarefaContext, ctx => ctx.dia)
  
  const diaSelecionadoFormatado = dia.format('DD/MM/YYYY')

  return (
    <>
      <Title>{diasDaSemana.find(({ value }) => value === dia.day() + 1)?.label}, {dia.date()} de {meses[dia.month()]}</Title>
      <Table>
        {tarefas
          .filter((tarefa) => {
            const tarefaDataFormatado = tarefa.data.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3/$2/$1")
            const mostrar = tarefa.tipo === 1 ?
              dia.format('YYYY/MM/DD') >= tarefaDataFormatado && tarefa["data-recorrente"]?.includes(dia.day() + 1)
            :
              diaSelecionadoFormatado === tarefa.data
            
            return mostrar
          })
          .sort((a, b) => {
            const terminadoNoDiaA = getTermino(a, diaSelecionadoFormatado)
            const terminadoNoDiaB = getTermino(b, diaSelecionadoFormatado)
            return terminadoNoDiaA === terminadoNoDiaB ? 0 : terminadoNoDiaA ? 1 : -1
          })
          .map((tarefa, index) => {
            return (
              <Component
                diaSelecionadoFormatado={diaSelecionadoFormatado}
                setTarefas={setTarefas}
                key={index}
                tarefa={tarefa}
              />
            )
          })
        }
      </Table>
    </>
  );
};

const Table = styled.table`
  font-family: unset;
  td {
    padding: 2px 5px;
  }
`

export default Lista