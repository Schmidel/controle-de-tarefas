import React, { useState } from 'react';
import { Button, Modal, Form } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import { Tarefa } from '../types/Tarefa'
import TarefaForm from './TarefaForm'

type Props = {
  onSave: (tarefa: Tarefa) => void
  diaSelecionadoFormatado: string
}
const App: React.FC<Props> = ({ onSave, diaSelecionadoFormatado }) => {
  // estado que altera o icone de loading no botão de salvar na modal
  const [loading, setLoading] = useState(false);
  // estado que controla o abre e fecha da modal
  const [open, setOpen] = useState(false);
  // função que mostra a modal
  const showModal = () => {
    setOpen(true);
  };

  // função de salvar que altera o loading de acordo com o fim da ação
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  // função que reseta o formulário quando a modal é fechada
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleSave = (tarefa: Tarefa) => {
    onSave(tarefa)
    setOpen(false)
  }

  const [form] = Form.useForm();

  return (
    <>
      <FileAddTwoTone type="primary" onClick={showModal}></FileAddTwoTone >
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Fechar
          </Button>,
          <Button key="submit" htmlType="submit" form="tarefa" type="primary" loading={loading}>
            Salvar
          </Button>
        ]}
      >
        <TarefaForm form={form} onSave={handleSave} diaSelecionadoFormatado={diaSelecionadoFormatado} />
      </Modal>
    </>
  );
};

export default App;
