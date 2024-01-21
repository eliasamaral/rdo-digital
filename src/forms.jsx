import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import locale from "antd/es/date-picker/locale/pt_BR";

import { useMutation, useQuery } from "@apollo/client";
import { CREATE_RDO, GET_PROJETO } from "./Schemas";

import RDO_default from "./PDFtemplates/RDO_default";

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
  Spin,
  Radio,
} from "antd";

const { TextArea } = Input;
const { Title, Text } = Typography;

const Forms = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_PROJETO, {
    variables: { projeto: parseFloat(id) },
  });
  const [createRDO, { data: createRDOdata }] = useMutation(CREATE_RDO);

  const [encarregado, setEncarregado] = useState("");
  const [dataDaProducao, setdataDaProducao] = useState("");
  const [clima, setClima] = useState({
    manha: "Bom",
    tarde: "Bom",
  });
  const [maoDeObra, setMaoDeObra] = useState({
    encarregado: 1,
    motorista: 1,
    eletricista: 3,
    auxiliar: 3,
  });

  const [observacoes, setObservacoes] = useState("Não a observações.");
  const [servicos, setServicos] = useState([]);
  const [quantidadesServicos, setQuantidadesServicos] = useState({});
  const [isFinal, setIsFinal] = useState();

  const [fichaTrafo, setFichaTrafo] = useState({
    estf: "",
    estfsucata: "",
    nSerie: "",
    nSucataSerie: "",
    NA: "",
    NB: "",
    NC: "",
    AB: "",
    AC: "",
    BC: "",
  });

  if (createRDOdata) {
    console.log("Success", createRDOdata);
    navigate("/");
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  if (error) return `Submission error! ${error.message}`;

  const { projeto, diagrama, local, RDODigital } = data.getProjeto;

  const servicosObra = RDODigital.map((item) => ({ ...item }));

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    switch (name) {
      case "encarregado":
        setEncarregado(value);
        break;
      case "climaManha":
        setClima({ ...clima, manha: value });
        break;
      case "climaTarde":
        setClima({ ...clima, tarde: value });
        break;
      case "encarregadoQuantidade":
        setMaoDeObra({ ...maoDeObra, encarregado: value });
        break;
      case "motoristaQuantidade":
        setMaoDeObra({ ...maoDeObra, motorista: value });
        break;
      case "eletricistaQuantidade":
        setMaoDeObra({ ...maoDeObra, eletricista: value });
        break;
      case "auxiliarQuantidade":
        setMaoDeObra({ ...maoDeObra, auxiliar: value });
        break;
      case "estf":
        setFichaTrafo({ ...fichaTrafo, estf: value });
        break;
      case "estfsucata":
        setFichaTrafo({ ...fichaTrafo, estfsucata: value });
        break;
      case "nSerie":
        setFichaTrafo({ ...fichaTrafo, nSerie: value });
        break;
      case "nSucataSerie":
        setFichaTrafo({ ...fichaTrafo, nSucataSerie: value });
        break;
      case "NA":
        setFichaTrafo({ ...fichaTrafo, NA: value + "V" });
        break;
      case "NB":
        setFichaTrafo({ ...fichaTrafo, NB: value + "V" });
        break;
      case "NC":
        setFichaTrafo({ ...fichaTrafo, NC: value + "V" });
        break;
      case "AB":
        setFichaTrafo({ ...fichaTrafo, AB: value + "V" });
        break;
      case "AC":
        setFichaTrafo({ ...fichaTrafo, AC: value + "V" });
        break;
      case "BC":
        setFichaTrafo({ ...fichaTrafo, BC: value + "V" });
        break;
      case "observacoes":
        setObservacoes(value);
        break;
      case "dataDaProducao":
        setdataDaProducao(value);
        break;
      case "servicos":
        const updatedQuantidadesServicos = { ...quantidadesServicos };
        if (value === null || value === "") {
          delete updatedQuantidadesServicos[index];
        } else {
          updatedQuantidadesServicos[index] = value;
        }

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
    const data = {
      dataAtual,
      projeto,
      diagrama,
      local,
      encarregado,
      observacoes,
      maoDeObra,
      clima,
      servicos,
      dataDaProducao,
      isFinal,
      fichaTrafo,
    };
    createRDO({
      variables: data,
    });
    gerarPDF(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert("Preencha todos os campos");
  };

  const onChangeRadioButton = (e) => {
    setIsFinal(e.target.value);
  };
  const gerarPDF = (data) => {
    RDO_default(data);

    console.log("PDF Sucesses", data);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600, margin: "20px 10px" }}
      initialValues={{ remember: false }}
      autoComplete="off"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={4} style={{ margin: "0px" }}>
          Relatório de obras
        </Title>

        <Button type="primary" htmlType="submit">
          Gerar PDF
        </Button>
      </Space>

      <Divider />

      <Space
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title type="secondary" level={5} style={{ margin: "0px" }}>
          Projeto
        </Title>
        <Title level={5} style={{ margin: "0px" }}>
          {projeto}
        </Title>
      </Space>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title type="secondary" level={5} style={{ margin: "0px" }}>
          Diagrama
        </Title>
        <Title level={5} style={{ margin: "0px" }}>
          {diagrama}
        </Title>
      </Space>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title type="secondary" level={5} style={{ margin: "0px" }}>
          Local
        </Title>
        <Title level={5} style={{ margin: "0px" }}>
          {local}
        </Title>
      </Space>
      <Divider orientation="left">Informante</Divider>

      <Space>
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
            locale={locale}
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

      <Divider orientation="left">Status da obra</Divider>

      <Form.Item
        name="isFinal"
        rules={[
          {
            required: true,
            message: "Obrigatorio!",
          },
        ]}
      >
        <Radio.Group onChange={onChangeRadioButton} value={isFinal}>
          <Radio value={true}>Final</Radio>
          <Radio value={false}>Parcial</Radio>
        </Radio.Group>
      </Form.Item>

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
            value={clima.manha}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Item>

        <Form.Item>
          <Input
            addonBefore="Tarde"
            placeholder="Clima"
            name="climaTarde"
            value={clima.tarde}
            onChange={(e) => handleInputChange(e)}
          />
        </Form.Item>
      </Space>

      <Divider orientation="left">Ficha Transformador</Divider>

      <Space direction="vertical">
        <Text style={{ fontSize: "13px", color: "#ff0000cc", fontWeight: 900 }}>
          EQUIPAMENTO NOVO
        </Text>
        <Space>
          <Space direction="vertical">
            <Input
              style={{ marginBottom: "20px" }}
              addonBefore="ESTF"
              name="estf"
              type="number"
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              addonBefore="X0 a X1"
              name="NA"
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              addonBefore="X0 a X2"
              name="NB"
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              addonBefore="X0 a X3"
              name="NC"
              onChange={(e) => handleInputChange(e)}
            />
          </Space>
          <Space direction="vertical">
            <Input
              style={{ marginBottom: "20px" }}
              addonBefore="N° de série"
              name="nSerie"
              type="number"
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              addonBefore="X1 a X2"
              name="AB"
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              addonBefore="X1 a X3"
              name="AC"
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              addonBefore="X2 a X3"
              name="BC"
              onChange={(e) => handleInputChange(e)}
            />
          </Space>
        </Space>
        <Space direction="vertical" style={{ marginTop: "10px" }}>
          <Text
            style={{ fontSize: "13px", color: "#ff0000cc", fontWeight: 900 }}
          >
            EQUIPAMENTO VELHO
          </Text>
          <Space>
            <Input
              style={{ marginBottom: "20px" }}
              addonBefore="ESTF"
              name="estfsucata"
              type="number"
              onChange={(e) => handleInputChange(e)}
            />
            <Input
              style={{ marginBottom: "20px" }}
              addonBefore="N° de série"
              name="nSucataSerie"
              type="number"
              onChange={(e) => handleInputChange(e)}
            />
          </Space>
        </Space>
      </Space>

      <Divider orientation="left">Quantidade de mão de obra</Divider>

      <Space>
        <Space direction="vertical">
          <Text style={{ margin: "0px", fontSize: "13px" }}>Encarregado</Text>
          <Input
            type="number"
            name="encarregadoQuantidade"
            value={maoDeObra.encarregado}
            onChange={(e) => handleInputChange(e)}
          />
        </Space>
        <Space direction="vertical">
          <Text style={{ margin: "0px", fontSize: "13px" }}>Motorista</Text>
          <Input
            type="number"
            name="motoristaQuantidade"
            value={maoDeObra.motorista}
            onChange={(e) => handleInputChange(e)}
          />
        </Space>
        <Space direction="vertical">
          <Text style={{ margin: "0px", fontSize: "13px" }}>Eletricista</Text>
          <Input
            type="number"
            name="eletricistaQuantidade"
            value={maoDeObra.eletricista}
            onChange={(e) => handleInputChange(e)}
          />
        </Space>
        <Space direction="vertical">
          <Text style={{ margin: "0px", fontSize: "13px" }}>Auxiliar</Text>
          <Input
            type="number"
            name="auxiliarQuantidade"
            value={maoDeObra.auxiliar}
            onChange={(e) => handleInputChange(e)}
          />
        </Space>
      </Space>

      <Divider orientation="left">Relatos de desvios e/ou retrabalhos</Divider>

      <TextArea
        placeholder="..."
        rows={4}
        name="observacoes"
        onChange={(e) => handleInputChange(e)}
      />

      <Divider orientation="left">Serviços executados</Divider>
      <List
        itemLayout="horizontal"
        dataSource={RDODigital}
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

      <Space style={{ marginBlock: "10px" }}>
        <Button type="primary" htmlType="submit">
          Gerar PDF
        </Button>
      </Space>
    </Form>
  );
};

export default Forms;
