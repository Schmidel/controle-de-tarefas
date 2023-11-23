import { Fragment, useState } from 'react'; 
import { Checkbox, Rate, Typography } from 'antd'; 
import { TagOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'; 
import { corModelos } from '../utils/values' 
import { Tarefa } from '../types/Tarefa' 

const { Text } = Typography

type ComponentProps = { 
    tarefa: Tarefa 
    setTarefas: React.Dispatch<React.SetStateAction<Tarefa[]>>;
    diaSelecionadoFormatado: string;
}
//componente React que renderiza uma tarefa e permite ao usuário atualizar o nome da tarefa. -> deveria ser mais que apenas o nome 
function Component({ tarefa, setTarefas, diaSelecionadoFormatado }: ComponentProps) {
    const [open, setOpen] = useState(false) // passar esse open para ser a modal que ja utilizamos 
    const [value, setValue] = useState('')

    let terminado = false, progressoDoDia: number | undefined
    if (tarefa.progresso) {
        progressoDoDia = tarefa.tipo === 1 ? tarefa.progressoPorData?.[diaSelecionadoFormatado] : tarefa.progresso?.cumprido
        terminado = progressoDoDia === tarefa.progresso?.total
    }
    else {
        terminado = tarefa.tipo === 1 ? tarefa.terminoPorData?.[diaSelecionadoFormatado] || false : tarefa.terminado
    }
    const { id, nome, progresso, tipo, modelo = 0 } = tarefa
    const handleUpdate = () => {
        if (!value || !value.trim()) return;
        const tarefaAtt = { ...tarefa, nome: value };
        setTarefas((oldState) =>
            oldState.map((tarefaMap) => {
                if (tarefaMap.id === id && diaSelecionadoFormatado === diaSelecionadoFormatado) {
                    return {
                        ...tarefaAtt,

                    };
                }

                return tarefaMap;
            })
        );
        setValue('')
        setOpen(false)

    };
    const onChangeProgresso = (cumprido: number) => {
        setTarefas(([...tarefas]) => tarefas.map((tarefaItem) => {
            if (tarefa.id === tarefaItem.id && tarefaItem.progresso?.total) {
                if (tarefaItem.tipo === 1) {
                    tarefaItem.progressoPorData = {
                        ...tarefaItem.progressoPorData,
                        [diaSelecionadoFormatado]: cumprido
                    }
                }
                else {
                    tarefaItem.progresso.cumprido = cumprido
                    tarefaItem.terminado = cumprido === tarefaItem.progresso.total
                }
                return { ...tarefaItem }
            }
            return tarefaItem
        }))
    }

    const onChangeTermino = (terminado: boolean) => {
        setTarefas(([...tarefas]) => tarefas.map((tarefaItem) => {
            if (tarefa.id === tarefaItem.id) {
                if (tarefaItem.tipo === 1) {
                    tarefaItem.terminoPorData = {
                        ...tarefaItem.terminoPorData,
                        [diaSelecionadoFormatado]: terminado
                    }
                    tarefaItem.progressoPorData = {
                        ...tarefaItem.progressoPorData,
                        [diaSelecionadoFormatado]: terminado ? tarefaItem.progresso?.total || 0 : 0
                    }
                }
                else {
                    console.log(terminado, tarefaItem.progresso)
                    if (terminado && tarefaItem.progresso) {
                        tarefaItem.progresso.cumprido = tarefaItem.progresso.total
                    }
                    tarefaItem.terminado = terminado
                }
                return { ...tarefaItem }
            }
            return tarefaItem
        }))
    }

    const handleDelete = () => setTarefas((oldTarefas) => oldTarefas.filter((tarefa) => tarefa.id !== id))
    return (
        <tr style={terminado ? { opacity: 0.3 } : {}}>
            {open && ( // open passar a abrir a primeira modal que utilizamos 
                <Fragment>
                    <input onChange={(e) => setValue(e.target.value)} placeholder='editar' />
                    <button onClick={() => handleUpdate()}>salvar</button>
                </Fragment>
            )
            }
            {!open &&
                <>
                    <td>
                        <Checkbox checked={terminado} onClick={() => onChangeTermino(!terminado)} />
                    </td>
                    <td>
                        {tipo === 2 && (
                            <TagOutlined style={{ marginRight: '5px' }} color={corModelos[modelo - 1]} />
                        )}
                        <Text>{nome}</Text>
                    </td>
                    <EditOutlined onClick={() => setOpen(true)}>editar</EditOutlined>
                    <DeleteOutlined onClick={handleDelete}>excluir</DeleteOutlined>

                    <td>
                        {progresso && (
                            <>
                                <Rate value={progressoDoDia} count={progresso.total} disabled character={({ value = 0, index = 0 }) => <Checkbox checked={index < value} onClick={() => onChangeProgresso(index + 1)} />} />
                                <Text disabled style={{ marginLeft: '10px' }}>
                                    {progresso.tipo}
                                </Text>
                            </>
                        )}
                    </td>
                </>}
        </tr>
    );
}
export default Component