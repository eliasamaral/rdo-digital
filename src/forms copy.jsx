import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_RDO } from "./Schemas";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
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
import { base64 } from "./base64";

const { TextArea } = Input;
const { Title } = Typography;

const Forms = () => {
  const { id } = useParams();
  const obra = obras.find((obra) => obra.projeto == id);

  const [projeto, setProjeto] = useState(obra.projeto);
  const [encarregado, setEncarregado] = useState("");
  const [climaManha, setClimaManha] = useState("");
  const [climaTarde, setClimaTarde] = useState("");
  const [encarregadoQuantidade, setEncarregadoQuantidade] = useState();
  const [motoristaQuantidade, setMotoristaQuantidade] = useState();
  const [eletricistaQuantidade, setEletricistaQuantidade] = useState();
  const [auxiliarQuantidade, setAuxiliarQuantidade] = useState();
  const [observacoes, setObservacoes] = useState("Não a observações.");
  const [dataDaProducao, setdataDaProducao] = useState("");
  const [servicos, setServicos] = useState(
    obra.srv.map((item) => ({ ...item }))
  );

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
        const updatedServicos = [...servicos];
        updatedServicos[index].quantidade = value;

        break;
      default:
        break;
    }
  };

  // updatedServicos.map((i)=>{
  //   if(i.quantidade){
  //     //console.log(i)
  //     //setServicos(updatedServicos);

  //   } })

  const date = new Date();
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const ano = date.getFullYear();
  const dataAtual = dia + "/" + mes + "/" + ano;

  const gerarPDF = () => {
    // console.log({
    //   variables: {
    //     projeto,
    //     encarregado,
    //     climaManha,
    //     climaTarde,
    //     encarregadoQuantidade,
    //     motoristaQuantidade,
    //     eletricistaQuantidade,
    //     auxiliarQuantidade,
    //     observacoes,
    //     dataDaProducao,
    //     servicos,
    //   },
    // });

    const doc = new jsPDF();

    doc.text("RDO Digital", 14, 10);

    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text("MT Montagem e Manutenção - Relatório de Obras", 14, finalY + 8);

    doc.setFontSize(8);
    doc.text(`Gerado em ${dataAtual}`, 170, 10);

    // Cabeçario
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    autoTable(doc, {
      startY: finalY + 20,
      body: [
        { funcao: "Projeto:", value: `${projeto}` },
        { funcao: "Encarregado:", value: `${encarregado}` },
        { funcao: "Local:", value: `${obra.local}` },
        { funcao: "Data:", value: `${dataDaProducao}` },
      ],
      showHead: "firstPage",
      styles: { overflow: "hidden" },
      margin: { right: 107 },
      // theme: 'plain',
    });
    // Observaçoes
    doc.setFontSize(12);
    autoTable(doc, {
      startY: finalY + 20,
      columns: [{ header: "Observações", dataKey: "observaçoes" }],
      body: [{ observaçoes: `${observacoes}` }],
      showHead: "firstPage",
      margin: { left: 107 },
      // Override the default above for the text column
      columnStyles: { text: { cellWidth: "auto" } },
    });

    // Mão de obra
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text("Mão de obra", 14, finalY + 25);
    autoTable(doc, {
      startY: finalY + 30,
      columns: [
        { header: "Função", dataKey: "funcao" },
        { header: "Quantidade", dataKey: "quantidade" },
      ],
      body: [
        { funcao: "Encarregado", quantidade: `${encarregadoQuantidade}` },
        { funcao: "Motorista", quantidade: `${motoristaQuantidade}` },
        { funcao: "Eletricista", quantidade: `${eletricistaQuantidade}` },
        { funcao: "Auxiliar", quantidade: `${auxiliarQuantidade}` },
      ],
      showHead: "firstPage",
      styles: { overflow: "hidden" },
      margin: { right: 107 },
    });

    // Clima
    doc.setFontSize(12);
    doc.text("Condições Climaticas", 107, finalY + 25);
    autoTable(doc, {
      startY: finalY + 30,
      columns: [
        { header: "Período", dataKey: "periodo" },
        { header: "Condição", dataKey: "condição" },
      ],
      body: [
        { periodo: "Manhã", condição: `${climaManha}` },
        { periodo: "Tarde", condição: `${climaTarde}` },
      ],
      showHead: "firstPage",
      styles: { overflow: "hidden" },
      margin: { left: 107 },
    });

    //Serviços
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text("Serviços executados", 14, finalY + 25);
    autoTable(doc, {
      startY: finalY + 30,
      columns: [
        { header: "Código", dataKey: "codigo" },
        { header: "Descrição", dataKey: "descricao" },
        { header: "Quantidade", dataKey: "quantidade" },
      ],
      body: servicos,
    });

    doc.save(`${dataDaProducao} ${projeto} ${encarregado} ${obra.local}.pdf`);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: false }}
      // onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Title level={4}>Formulário</Title>
      <Space>
        <Input
          type="number"
          placeholder="Projeto"
          name="projeto"
          value={projeto}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          type="text"
          placeholder="Encarregado"
          name="encarregado"
          value={encarregado}
          onChange={(e) => handleInputChange(e)}
        />
        <DatePicker
          format={"DD/MM/YYYY"}
          placeholder="Data"
          inputReadOnly={true}
          onChange={(e) => {
            const value1 = dayjs(e).format("DD/MM/YYYY");
            setdataDaProducao(value1);
          }}
        />
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
        <Button type="primary" htmlType="submit" onClick={gerarPDF}>
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Forms;
