import React from 'react'
import { useContextSelector } from 'use-context-selector'
import styled from 'styled-components'
import type { Dayjs } from 'dayjs'
import { Calendar, Space, Badge } from 'antd';
import ModalTarefa from "components/ModalTarefa"
import { Tarefa } from 'types/Tarefa'
import { corModelos } from 'utils/values'
import tarefaContext from 'contexts/Tarefas'

function Calendario ()  {
    const tarefas = useContextSelector(tarefaContext, ctx => ctx.tarefas)
    const setTarefas = useContextSelector(tarefaContext, ctx => ctx.setTarefas)
    const dia = useContextSelector(tarefaContext, ctx => ctx.dia)
    const setDia = useContextSelector(tarefaContext, ctx => ctx.setDia)

    const diaSelecionadoFormatado = dia.format('DD/MM/YYYY')

    function createComponent(tarefa: Tarefa){
        setTarefas(tarefas => [...tarefas, tarefa])
    }

    const dateCellRender = (valor: Dayjs) => {
        const valorFormatado = valor.format('YYYY/MM/DD')
        const events = tarefas.filter((tarefa) => {
            const tarefaData = tarefa.data.replace(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "$3/$2/$1")
            const mostrar = [2, 3].includes(tarefa.tipo) && valorFormatado === tarefaData
            // const mostrar = tarefa.tipo === 1 ?
            //     valorFormatado >= tarefaData && tarefa["data-recorrente"]?.includes(valor.day() + 1)
            // :
            //     valorFormatado === tarefaData
            return mostrar
        })
        return (
            <div>
            <Space direction="vertical">
                {events.map(({ nome, tipo = 0 }, index) => {
                    return (
                        <BadgeStyled key={index} color={corModelos[tipo - 1]} text={nome} />
                    )
                })}
            </Space>
            </div>
        );
    };

    return (
        <>
            <ModalBotao>
            <ModalTarefa diaSelecionadoFormatado={diaSelecionadoFormatado} onSave={createComponent}/>
            </ModalBotao>
            <Calendar fullscreen={true} dateCellRender={dateCellRender} onSelect={data => { setDia(data) }} />
        </>
    )
}

const ModalBotao = styled.div`
  display: flex;
  justify-content: flex-end;
`

const BadgeStyled = styled(Badge)`
  display: flex;
  align-items: center;
`

export default Calendario