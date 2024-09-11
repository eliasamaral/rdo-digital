import dayjs from 'dayjs'
import React, { useState } from 'react'
import 'dayjs/locale/pt-br'
import locale from 'antd/es/date-picker/locale/pt_BR'
import { useNavigate } from 'react-router-dom'
import { createRDOHook } from './services/hook'

import { gerarPDF } from './services/gerarPDF'

import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Space,
  Spin,
  Typography,
} from 'antd'

const { TextArea } = Input
const { Title, Text } = Typography

const Generica = () => {
  const { createRDOData, createRDOLoading, createRDOError, submit } =
    createRDOHook()

  const navigate = useNavigate()

  const [projeto, setProjeto] = useState('')
  const [local, setLocal] = useState('')
  const [encarregado, setEncarregado] = useState('')
  const [dataDaProducao, setdataDaProducao] = useState('')
  const [clima, setClima] = useState({
    manha: 'Bom',
    tarde: 'Bom',
  })

  const [atividades, setAtividades] = useState([{ atividade: '', duracao: '', executante: '' }])

  const [maoDeObra, setMaoDeObra] = useState([
    { nome: '', funcao: '', inicio: '', fim: '' },
  ])

  const [observacoes, setObservacoes] = useState('Não a observações.')
  if (createRDOLoading) {
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin />
      </div>
    )
  }

  if (createRDOError) return `Submission error! ${createRDOError.message}`

  const handleInputChange = (e, index) => {
    const { name, value } = e.target

    switch (name) {
      case 'projeto':
        setProjeto(value)
        break
      case 'local':
        setLocal(value)
        break
      case 'encarregado':
        setEncarregado(value)
        break
      case 'climaManha':
        setClima({ ...clima, manha: value })
        break
      case 'climaTarde':
        setClima({ ...clima, tarde: value })
        break
      case 'observacoes':
        setObservacoes(value)
        break
      case 'dataDaProducao':
        setdataDaProducao(value)
        break

      default:
        break
    }
  }

  const date = new Date()
  const dia = String(date.getDate()).padStart(2, '0')
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const ano = date.getFullYear()
  const dataAtual = `${dia}/${mes}/${ano}`

  const addMaoDeObra = () => {
    setMaoDeObra([...maoDeObra, { nome: '', funcao: '', inicio: '', fim: '' }])
  }

  const addAtividades = () => {
    setAtividades([...atividades, { atividade: '', duracao: '' }])
  }

  const handleMaoDeObraChange = (e, index) => {
    const { name, value } = e.target
    const updatedMaoDeObra = [...maoDeObra]
    updatedMaoDeObra[index][name] = value
    setMaoDeObra(updatedMaoDeObra)
  }

  const handleAtividadeChange = (e, index) => {
    const { name, value } = e.target
    const updatedAtividade = [...atividades]
    updatedAtividade[index][name] = value
    setAtividades(updatedAtividade)
  }

  const onFinish = () => {
    const data = {
      dataAtual,
      projeto,
      local,
      encarregado,
      observacoes,
      clima,
      dataDaProducao,
      atividades,
      maoDeObra,
    }

     submit(data)
    // gerarPDF(data)
     if (createRDOData) {
        navigate('/')
     }
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
    alert('Preencha todos os campos')
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: '20px 10px' }}
      initialValues={{ remember: false }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title level={4} style={{ margin: '0px' }}>
          Relatório de obras
        </Title>

        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Space>

      <Divider />

      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBlock: '10px',
        }}
      >
        <Title type="secondary" level={5} style={{ margin: '0px' }}>
          Projeto
        </Title>
        <Form.Item
          name="projeto"
          rules={[
            {
              required: false,
              message: 'Obrigatorio!',
            },
          ]}
          style={{ margin: '0px' }}
        >
          <Input name="projeto" onChange={e => handleInputChange(e)} />
        </Form.Item>
      </Space>

      <Space
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title type="secondary" level={5} style={{ margin: '0px' }}>
          Local
        </Title>
        <Form.Item
          name="local"
          rules={[
            {
              required: false,
              message: 'Obrigatorio!',
            },
          ]}
          style={{ margin: '0px' }}
        >
          <Input
            name="local"
            value={local}
            onChange={e => handleInputChange(e)}
          />
        </Form.Item>
      </Space>
      <Divider orientation="left">Informante</Divider>

      <Space>
        <Form.Item
          name="encarregado"
          rules={[
            {
              required: false,
              message: 'Obrigatorio!',
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Líder de equipe"
            name="encarregado"
            value={encarregado}
            onChange={e => {
              setEncarregado(e.target.value)
            }}
          />
        </Form.Item>

        <Form.Item
          name="data"
          rules={[
            {
              required: false,
              message: 'Obrigatorio!',
            },
          ]}
        >
          <DatePicker
            locale={locale}
            format={'DD/MM/YYYY'}
            placeholder="Data"
            inputReadOnly={true}
            onChange={e => {
              const value1 = dayjs(e).format('DD/MM/YYYY')
              setdataDaProducao(value1)
            }}
          />
        </Form.Item>
      </Space>

      <Divider orientation="left">Clima</Divider>

      <Space>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Precisamos de um diagrama ou ordem.',
            },
          ]}
        >
          <Input
            addonBefore="Manhã"
            placeholder="Clima"
            name="climaManha"
            value={clima.manha}
            onChange={e => handleInputChange(e)}
          />
        </Form.Item>

        <Form.Item>
          <Input
            addonBefore="Tarde"
            placeholder="Clima"
            name="climaTarde"
            value={clima.tarde}
            onChange={e => handleInputChange(e)}
          />
        </Form.Item>
      </Space>

      <Divider orientation="left">Mão de obra</Divider>
      {maoDeObra.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '5px',
            gap: '10px',
          }}
        >
          <Space direction="vertical">
            <Text style={{ margin: '0px', fontSize: '13px' }}>Nome</Text>
            <Input
              name="nome"
              value={item.nome}
              onChange={e => handleMaoDeObraChange(e, index)}
            />
          </Space>
          <Space direction="vertical">
            <Text style={{ margin: '0px', fontSize: '13px' }}>Função</Text>
            <Input
              name="funcao"
              value={item.funcao}
              onChange={e => handleMaoDeObraChange(e, index)}
            />
          </Space>
          <Space direction="vertical">
            <Text style={{ margin: '0px', fontSize: '13px' }}>Entrada</Text>
            <Input
              type="time"
              name="inicio"
              value={item.inicio}
              onChange={e => handleMaoDeObraChange(e, index)}
            />
          </Space>
          <Space direction="vertical">
            <Text style={{ margin: '0px', fontSize: '13px' }}>Saida</Text>
            <Input
              type="time"
              name="fim"
              value={item.fim}
              onChange={e => handleMaoDeObraChange(e, index)}
            />
          </Space>
        </div>
      ))}

      <Space>
        <Button onClick={addMaoDeObra} type="default">
          Adicionar
        </Button>
      </Space>

      <Divider orientation="left">Atividades</Divider>
      {atividades.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '5px',
            gap: '10px',
          }}
        >
          <Space
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '5px',
              alignItems: 'initial',
            }}
          >
            <Text style={{ margin: '0px', fontSize: '13px' }}>Descrição</Text>
            <Input
              name="atividade"
              value={item.atividade}
              onChange={e => handleAtividadeChange(e, index)}
            />
          </Space>
          <Space direction="vertical">
            <Text style={{ margin: '0px', fontSize: '13px' }}>Duração</Text>
            <Input
              type="time"
              name="duracao"
              value={item.duracao}
              onChange={e => handleAtividadeChange(e, index)}
            />
          </Space>
          <Space direction="vertical">
            <Text style={{ margin: '0px', fontSize: '13px' }}>Executante</Text>
            <Input
              type="text"
              name="executante"
              value={item.executante}
              onChange={e => handleAtividadeChange(e, index)}
            />
          </Space>
        </div>
      ))}

      <Space>
        <Button onClick={addAtividades} type="default">
          Adicionar
        </Button>
      </Space>

      <Divider orientation="left">Relatos de desvios e/ou retrabalhos</Divider>

      <TextArea
        placeholder="..."
        rows={4}
        name="observacoes"
        onChange={e => handleInputChange(e)}
      />

      <Space style={{ marginBlock: '10px' }}>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Space>
    </Form>
  )
}

export default Generica
