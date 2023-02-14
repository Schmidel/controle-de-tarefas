import { Checkbox, Rate, Typography } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Tarefa } from '../types/Tarefa'
import { corModelos } from '../utils/values'

const { Text } = Typography

type ComponentProps = {
    tarefa: Tarefa
    onChangeProgresso: (cumprido: number) => void
    onChangeTermino: (terminado: boolean) => void
    hidden?: boolean
    terminado?: boolean
    progressoDoDia?: number
}

function Component({ tarefa, onChangeProgresso, onChangeTermino, hidden, terminado, progressoDoDia = 0 }: ComponentProps ){

    const { nome, progresso, tipo, modelo = 0 } = tarefa
    return(
        <tr hidden={hidden} style={terminado ? { opacity: 0.3 } : {}}>
            <td>
                <Checkbox checked={terminado} onClick={() => onChangeTermino(!terminado)} />
            </td>
            <td>
                {tipo === 2 && (
                    <TagOutlined style={{ marginRight: '5px' }} color={corModelos[modelo - 1]} />
                )}
                <Text>{nome}</Text>
            </td>
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
        </tr>
 );
}

export default Component