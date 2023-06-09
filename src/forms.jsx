import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useMutation } from "@apollo/client";
import { CREATE_RDO } from "./Schemas";

import { template1, template2 } from "./PDFtemplates";
import {
  Input,
  Space,
  Divider,
  List,
  InputNumber,
  Button,
  Typography,
  DatePicker,
  Form,
} from "antd";
import { obras } from "./db";

const { TextArea } = Input;
const { Title } = Typography;

const Forms = () => {
  const { id } = useParams();
  const obra = obras.find((obra) => obra.projeto == id);
  const servicosObra = obra.srv.map((item) => ({ ...item }));

  const [projeto, setProjeto] = useState(obra.projeto);
  const [encarregado, setEncarregado] = useState("");
  const [dataDaProducao, setdataDaProducao] = useState("");
  const [climaManha, setClimaManha] = useState("Bom");
  const [climaTarde, setClimaTarde] = useState("Bom");
  const [encarregadoQuantidade, setEncarregadoQuantidade] = useState(1);
  const [motoristaQuantidade, setMotoristaQuantidade] = useState(1);
  const [eletricistaQuantidade, setEletricistaQuantidade] = useState(3);
  const [auxiliarQuantidade, setAuxiliarQuantidade] = useState(3);
  const [observacoes, setObservacoes] = useState("Não a observações.");
  const [servicos, setServicos] = useState([]);
  const [quantidadesServicos, setQuantidadesServicos] = useState({});

  const [createRDO, { data, loading, error }] = useMutation(CREATE_RDO);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    switch (name) {
      case "projeto":
        setProjeto(value);
        break;
      case "encarregado":
        setEncarregado(value);
        break;
      case "climaManha":
        setClimaManha(value);
        break;
      case "climaTarde":
        setClimaTarde(value);
        break;
      case "encarregadoQuantidade":
        setEncarregadoQuantidade(value);
        break;
      case "motoristaQuantidade":
        setMotoristaQuantidade(value);
        break;
      case "eletricistaQuantidade":
        setEletricistaQuantidade(value);
        break;
      case "auxiliarQuantidade":
        setAuxiliarQuantidade(value);
        break;
      case "observacoes":
        setObservacoes(value);
        break;
      case "dataDaProducao":
        setdataDaProducao(value);
        break;
      case "servicos":
        const updatedQuantidadesServicos = { ...quantidadesServicos };
        updatedQuantidadesServicos[index] = value;

        const elementosComQuantidade = servicosObra
          .map((item, index) => {
            if (index in updatedQuantidadesServicos) {
              return { ...item, quantidade: updatedQuantidadesServicos[index] };
            }
            return null;
          })
          .filter(Boolean);

        setServicos(elementosComQuantidade);
        setQuantidadesServicos(updatedQuantidadesServicos);

        break;
      default:
        break;
    }
  };

  const date = new Date();
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  const dataAtual = dia + "/" + mes + "/" + ano;

  const onFinish = () => {
    gerarPDF();
    createRDO({
      variables: {
        dataAtual,
        projeto,
        encarregado,
        observacoes,
        encarregadoQuantidade,
        motoristaQuantidade,
        eletricistaQuantidade,
        auxiliarQuantidade,
        climaManha,
        climaTarde,
        servicos,
        dataDaProducao
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert("Preencha todos os campos");
  };

  const gerarPDF = () => {
    if (servicos.length > 0) {
      template1(
        dataAtual,
        projeto,
        encarregado,
        obra,
        observacoes,
        encarregadoQuantidade,
        motoristaQuantidade,
        eletricistaQuantidade,
        auxiliarQuantidade,
        climaManha,
        climaTarde,
        servicos,
        dataDaProducao
      );
    } else {
      template2(
        dataAtual,
        projeto,
        encarregado,
        obra,
        observacoes,
        encarregadoQuantidade,
        motoristaQuantidade,
        eletricistaQuantidade,
        auxiliarQuantidade,
        climaManha,
        climaTarde,
        dataDaProducao
      );
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: false }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Title level={4}>Formulário</Title>
      <Space>
        <Form.Item>
          <Input
            type="number"
            placeholder="Projeto"
            name="projeto"
            value={projeto}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Item>

        <Form.Item
          name="encarregado"
          rules={[
            {
              required: true,
              message: "Obrigatorio!",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Encarregado"
            name="encarregado"
            value={encarregado}
            onChange={(e) => {
              setEncarregado(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item
          name="data"
          rules={[
            {
              required: true,
              message: "Obrigatorio!",
            },
          ]}
        >
          <DatePicker
            format={"DD/MM/YYYY"}
            placeholder="Data"
            inputReadOnly={true}
            onChange={(e) => {
              const value1 = dayjs(e).format("DD/MM/YYYY");
              setdataDaProducao(value1);
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
              message: "Precisamos de um diagrama ou ordem.",
            },
          ]}
        >
          <Input
            addonBefore="Manhã"
            placeholder="Clima"
            name="climaManha"
            value={climaManha}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Item>

        <Form.Item>
          <Input
            addonBefore="Tarde"
            placeholder="Clima"
            name="climaTarde"
            value={climaTarde}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Item>
      </Space>

      <Divider orientation="left">Quantidade de mão de obra</Divider>

      <Space>
        <Input
          type="number"
          placeholder="Encarregado"
          name="encarregadoQuantidade"
          value={encarregadoQuantidade}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="number"
          placeholder="Motorista"
          name="motoristaQuantidade"
          value={motoristaQuantidade}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="number"
          placeholder="Eletricista"
          name="eletricistaQuantidade"
          value={eletricistaQuantidade}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="number"
          placeholder="Auxiliar"
          name="auxiliarQuantidade"
          value={auxiliarQuantidade}
          onChange={(e) => handleInputChange(e)}
        />
      </Space>

      <Divider orientation="left">Observações</Divider>

      <TextArea
        placeholder="Observações"
        rows={4}
        name="observacoes"
        onChange={(e) => handleInputChange(e)}
      />

      <Divider orientation="left">Serviços executados</Divider>
      <List
        itemLayout="horizontal"
        dataSource={obra.srv}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta title={item.codigo} description={item.descricao} />
            <InputNumber
              controls={false}
              step="0.000"
              type="number"
              name="servicos"
              onChange={(value) =>
                handleInputChange(
                  { target: { name: "servicos", value } },
                  index
                )
              }
            />
          </List.Item>
        )}
      />
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Forms;
