import { Badge } from 'antd';
import styled from 'styled-components'
import Lista from './components/Lista'
import Calendario from './components/Calendario'
import { Provider } from 'contexts/Tarefas'

export function Entrada () {
  return(
    <Provider>
      <Container>
        <CalendarColumn>
          <Calendario />
        </CalendarColumn>
        <TarefasColumn>
          <Lista />
        </TarefasColumn>
      </Container>
    </Provider>
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

