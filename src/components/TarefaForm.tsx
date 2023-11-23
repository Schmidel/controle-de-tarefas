import React, { useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Row, Col, Radio, Select, FormInstance } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs'
import { Tarefa } from '../types/Tarefa'
import { diasDaSemana } from '../utils/values'
import uniqid from 'uniqid';

type FormType = {
    nome: string;
    'progresso.tipo': string;
    'progresso.total': number;
    tipo: 1 | 2 | 3;
    modelo?: 1 | 2 | 3;
    data?: Dayjs;
    'data-recorrente'?: number[]
}
type Props = {
  onSave: (tarefa: Tarefa) => void
  diaSelecionadoFormatado: string
  form: FormInstance<FormType>
  defaultValue?: FormType
}
const App: React.FC<Props> = ({ onSave, diaSelecionadoFormatado, form, defaultValue = {} }) => {

  const handleSubmit = () => {
    console.log('handleSubmit')
    form.validateFields()
      .then(() => {

        const formValues = form.getFieldsValue()
        console.log(formValues)
        const { nome, tipo } = formValues
        const tarefa: Tarefa = {
          id: uniqid(),
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
          tarefa.data = diaSelecionadoFormatado
        }
        if (tipo === 2) {
          tarefa.modelo = formValues.modelo
          tarefa.data = formValues.data?.format('DD/MM/YYYY') || ''
        }
        if (tipo === 3) {
          tarefa.data = formValues.data?.format('DD/MM/YYYY') || ''
        }
        onSave(tarefa)
      })
  };

  const tipoValue = Form.useWatch('tipo', form);

  return (
    <Form name="tarefa" form={form} layout="vertical" autoComplete="off" initialValues={defaultValue} onSubmitCapture={handleSubmit}>
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
  );
};

export default App;
