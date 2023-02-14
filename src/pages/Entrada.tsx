import { useEffect, useMemo, useState } from "react";
import { Calendar, Badge, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs'
import styled from 'styled-components'
import Component  from '../components/Component';
import ModalTarefa from "../components/ModalTarefa"
import { Tarefa } from '../types/Tarefa'
import { corModelos, diasDaSemana, meses } from '../utils/values'

const { Title } = Typography;

type TarefaFormatado = Tarefa & {
  terminadoNoDia: boolean
  mostrar?: boolean
  progressoDoDia?: number
  onChangeProgresso: (cumprido: number) => void
  onChangeTermino: (terminado: boolean) => void
}

export function Entrada () {
  const [dia, setDia]= useState(dayjs(new Date()))
  const [tarefas, setTarefas]= useState<Tarefa []>([])

  useEffect(() => {
    const tarefas = localStorage.getItem("tarefas") || '[]'
    setTarefas(JSON.parse(tarefas) || [])
  }, [])

  useEffect(() => {
    if (tarefas?.length) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas))
    }
  }, [tarefas])

  function createComponent(tarefa: Tarefa){
    setTarefas(tarefas => [...tarefas, tarefa])
  }

  const dateCellRender = (valor: Dayjs) => {
    const valorFormatado = valor.format('DD/MM/YYYY')
    const events = tarefas.filter(({ data, tipo }) => tipo === 2 && data === valorFormatado)
    return (
      <div>
        <Space direction="vertical">
          {events.map(({ nome, modelo = 0 }, index) => {
            return (
              <BadgeStyled key={index} color={corModelos[modelo - 1]} text={nome} />
            )
          })}
        </Space>
      </div>
    );
  };

  const diaSelecionadoFormatado = dia.format('DD/MM/YYYY')

  const tarefasFormatado: TarefaFormatado[] = useMemo(() => {
    return tarefas.map((tarefa, index) => {
      const tarefaDataFormatado = tarefa.data.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3/$2/$1")
      const mostrar = tarefa.tipo === 1 ?
        dia.format('YYYY/MM/DD') >= tarefaDataFormatado && tarefa["data-recorrente"]?.includes(dia.day() + 1)
      :
        diaSelecionadoFormatado === tarefa.data
      let terminadoNoDia = false, progressoDoDia: number | undefined
      if (tarefa.progresso) {
        progressoDoDia = tarefa.tipo === 1 ? tarefa.progressoPorData?.[diaSelecionadoFormatado] : tarefa.progresso?.cumprido
        terminadoNoDia = progressoDoDia === tarefa.progresso?.total
      }
      else {
        terminadoNoDia = tarefa.tipo === 1 ? tarefa.terminoPorData?.[diaSelecionadoFormatado] || false : tarefa.terminado
      }

      const onChangeProgresso = (cumprido: number) => {
        setTarefas(([...tarefas]) => tarefas.map((tarefa, ndx) => {
          if (ndx === index && tarefa.progresso?.total) {
            if (tarefa.tipo === 1) {
              tarefa.progressoPorData = {
                ...tarefa.progressoPorData,
                [diaSelecionadoFormatado]: cumprido
              }
            }
            else {
              tarefa.progresso.cumprido = cumprido
              tarefa.terminado = cumprido === tarefa.progresso.total
            }
            return { ...tarefa }
          }
          return tarefa
        }))
      }

      const onChangeTermino = (terminado: boolean) => {
        setTarefas(([...tarefas]) => tarefas.map((tarefa, ndx) => {
          if (ndx === index) {
            if (tarefa.tipo === 1) {
              tarefa.terminoPorData = {
                ...tarefa.terminoPorData,
                [diaSelecionadoFormatado]: terminado
              }
              tarefa.progressoPorData = {
                ...tarefa.progressoPorData,
                [diaSelecionadoFormatado]: terminado ? tarefa.progresso?.total || 0 : 0
              }
            }
            else {
              console.log(terminado, tarefa.progresso)
              if (terminado && tarefa.progresso) {
                tarefa.progresso.cumprido = tarefa.progresso.total
              }
              tarefa.terminado = terminado
            }
            return { ...tarefa }
          }
          return tarefa
        }))
      }
      return { ...tarefa, progressoDoDia, terminadoNoDia, mostrar, onChangeProgresso, onChangeTermino }
    })
  }, [diaSelecionadoFormatado, tarefas])

  return(
    <Container>
      <CalendarColumn>
        <ModalBotao>
          <ModalTarefa onSave={createComponent}/>
        </ModalBotao>
        <Calendar fullscreen={true} dateCellRender={dateCellRender} onSelect={data => { setDia(data) }} />
      </CalendarColumn>
      <TarefasColumn>
        <Title>{diasDaSemana.find(({ value }) => value === dia.day() + 1)?.label}, {dia.date()} de {meses[dia.month()]}</Title>
        <Table>
          {tarefasFormatado
            .sort((a, b) => a.terminadoNoDia === b.terminadoNoDia ? 0 : a.terminadoNoDia ? 1 : -1)
            .map(({ progressoDoDia, terminadoNoDia, mostrar, onChangeProgresso, onChangeTermino, ...tarefa }, index) => {
              return (
                <Component
                  key={index}
                  tarefa={tarefa}
                  hidden={!mostrar}
                  terminado={terminadoNoDia}
                  progressoDoDia={progressoDoDia}
                  onChangeProgresso={onChangeProgresso}
                  onChangeTermino={onChangeTermino}
                />
              )
            })
          }
        </Table>
      </TarefasColumn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 30px;
`

const CalendarColumn = styled.div`
  flex: 1;
  min-width: 283px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const TarefasColumn = styled.div`
  flex: 1;
`

const ModalBotao = styled.div`
  display: flex;
  justify-content: flex-end;
`

const BadgeStyled = styled(Badge)`
  display: flex;
  align-items: center;
`

const Table = styled.table`
  font-family: unset;
  td {
    padding: 2px 5px;
  }
`

export default Entrada