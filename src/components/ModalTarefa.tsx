import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, DatePicker, Row, Col, Radio, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs'
import { TagOutlined } from '@ant-design/icons';
import { Tarefa } from '../types/Tarefa'
import { diasDaSemana } from '../utils/values'

type Props = {
    onSave: (tarefa: Tarefa) => void 
}
const App: React.FC<Props> = ({onSave}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleSubmit = () => {
    form.validateFields()
      .then(() => {
        const formValues = form.getFieldsValue()
        const { nome, tipo } = formValues
        const tarefa: Tarefa = {
          nome,
          tipo,
          terminado: false,
          data: ''
        }
        const temProgresso = formValues['progresso.total'] > 0
        if (temProgresso) {
          tarefa.progresso = {
            total: formValues['progresso.total'],
            cumprido: 0,
            tipo: formValues['progresso.tipo']
          }
        }
        if (tipo === 1) {
          tarefa['data-recorrente'] = formValues['data-recorrente']
          tarefa.data = dayjs().format('DD/MM/YYYY')
        }
        if (tipo === 2) {
          tarefa.modelo = formValues.modelo
          tarefa.data = formValues.data?.format('DD/MM/YYYY') || ''
        }
        if (tipo === 3) {
          tarefa.data = formValues.data?.format('DD/MM/YYYY') || ''
        }
        setOpen(false)
        onSave(tarefa)
      })
  };

  const [form] = Form.useForm<{
    nome: string;
    'progresso.tipo': string;
    'progresso.total': number;
    tipo: 1 | 2 | 3;
    modelo?: 1 | 2 | 3;
    data?: Dayjs;
    'data-recorrente'?: number[]
  }>();
  const tipoValue = Form.useWatch('tipo', form);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Adicionar tarefa
      </Button>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Fechar
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
            Salvar
          </Button>
        ]}
      >
        <Form name="tarefa" form={form} layout="vertical" autoComplete="off" initialValues={{}}>
          <Form.Item
            name="nome"
            label="Nome"
            rules={[
              {
                min: 3,
                required: true,
                message: 'Campo obrigatório'
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Row gutter={[20, 0]}>
            <Col span={12}>
              <Form.Item name="progresso.tipo" label="Progresso">
                <Input placeholder='Litros, Tempo, Pags, ...' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="progresso.total" label="Quantidade de passos">
                <InputNumber min={1} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="tipo"
            label="Tipo"
            rules={[
              {
                required: true,
                message: 'Campo obrigatório'
              },
            ]}
          >
            <Radio.Group>
              <Radio value={1}>Cotidiano</Radio>
              <Radio value={2}>Compromisso agendado</Radio>
              <Radio value={3}>Ocasional</Radio>
            </Radio.Group>
          </Form.Item>
          {tipoValue === 2 && (
            <Form.Item
              name="modelo"
              label="Modelo"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
              ]}
            >
              <Radio.Group>
                <Radio value={1}><TagOutlined color='#0746ae' />{' '}Pessoal</Radio>
                <Radio value={2}><TagOutlined color='#421789' />{' '}Trabalho</Radio>
                <Radio value={3}><TagOutlined color='#497000' />{' '}Casa</Radio>
              </Radio.Group>
            </Form.Item>
          )}
          {tipoValue === 1 ? (
            <Form.Item
              name="data-recorrente"
              label="Dias da semana"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                options={diasDaSemana}
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="data"
              label="Data"
              rules={[
                {
                  required: true,
                  message: 'Campo obrigatório'
                },
              ]}
            >
              <DatePicker format="DD/MM/YYYY" onChange={data => data?.format('DD/MM/YYYY')} />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default App;