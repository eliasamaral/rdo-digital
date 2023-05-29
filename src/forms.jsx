import React, { useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Input, Space, Divider, List, InputNumber, Button, Typography } from "antd";
import { obras } from "./db";

const { TextArea } = Input;
const { Title } = Typography;

const Forms = () => {
  const { id } = useParams();

  const obra = obras.find((obra) => obra.projeto == id);

  const [projeto, setProjeto] = useState(obra.projeto);
  const [encarregado, setEncarregado] = useState("");
  const [climaManha, setClimaManha] = useState("");
  const [climaTarde, setClimaTarde] = useState("");
  const [encarregadoQuantidade, setEncarregadoQuantidade] = useState("");
  const [motoristaQuantidade, setMotoristaQuantidade] = useState("");
  const [eletricistaQuantidade, setEletricistaQuantidade] = useState("");
  const [auxiliarQuantidade, setAuxiliarQuantidade] = useState("");
  const [observacoes, setObservacoes] = useState("Não a observações.");
  const [servicos, setServicos] = useState(
    obra.srv.map((item) => ({ ...item, quantidade: null }))
  );

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
      case "servicos":
        const updatedServicos = [...servicos];
        updatedServicos[index].quantidade = value;
        setServicos(updatedServicos);
        break;
      default:
        break;
    }
  };

  const data = new Date();
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();
  const dataAtual = dia + "/" + mes + "/" + ano;

  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.text("RDO Digital", 14, 10);

    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text("MT Montagem e Manutenção - Relatorio de Obras", 14, finalY + 8);

    doc.setFontSize(8);
    doc.text(`Gerado em ${dataAtual}`, 170, 10);

    // Cabeçario
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    autoTable(doc, {
      startY: finalY + 20,
      columns: [
        { header: `Projeto: ${projeto}` },
        { header: `Encarregado: ${encarregado}` },
        { header: `Local: ${obra.local}` },
      ],
      // theme: 'plain',
    });

    // Mão de obra
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text("Mão de obra", 14, finalY + 15);
    autoTable(doc, {
      startY: finalY + 20,
      columns: [
        { header: "Função", dataKey: "funcao" },
        { header: "Quantidade", dataKey: "quantidade" },
      ],
      body: [
        { funcao: "Encarregado", quantidade: `${encarregadoQuantidade}` },
        { funcao: "Motorista", quantidade: `${motoristaQuantidade}` },
        { funcao: "Eletrecista", quantidade: `${eletricistaQuantidade}` },
        { funcao: "Auxiliar", quantidade: `${auxiliarQuantidade}` },
      ],
      showHead: "firstPage",
      styles: { overflow: "hidden" },
      margin: { right: 107 },
    });

    // Clima
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text("Condições Climaticas", 14, finalY + 15);
    autoTable(doc, {
      startY: finalY + 20,
      columns: [
        { header: "Periodo", dataKey: "periodo" },
        { header: "Condição", dataKey: "condição" },
      ],
      body: [
        { periodo: "Manhã", condição: `${climaManha}` },
        { periodo: "Tarde", condição: `${climaTarde}` },
      ],
      showHead: "firstPage",
      styles: { overflow: "hidden" },
      margin: { right: 107 },
    });

    //Serviços
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text("Serviços executados", 14, finalY + 15);
    autoTable(doc, {
      startY: finalY + 20,
      columns: [
        { header: "Codigo", dataKey: "codigo" },
        { header: "Descrição", dataKey: "descricao" },
        { header: "Quantidade", dataKey: "quantidade" },
      ],
      body: servicos,
    });

    // Observaçoes
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    autoTable(doc, {
      startY: finalY + 20,
      columns: [{ header: "Observaçoes", dataKey: "observaçoes" }],
      body: [{ observaçoes: `${observacoes}` }],
      showHead: "firstPage",
      styles: { overflow: "hidden" },
      margin: { right: 107 },
    });

    //Teste

    doc.save(`${projeto} ${encarregado} ${obra.local}.pdf`);

  };

  return (
    <>
      <Title level={4}>Formulario</Title>
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
      </Space>

      <Divider orientation="left">Clima</Divider>

      <Space>
        <Input
          addonBefore="Manha"
          placeholder="Clima"
          name="climaManha"
          value={climaManha}
          onChange={(e) => handleInputChange(e)}
        />
        <Input
          addonBefore="Tarde"
          placeholder="Clima"
          name="climaTarde"
          value={climaTarde}
          onChange={(e) => handleInputChange(e)}
        />
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
          placeholder="Eletrecista"
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
        placeholder="Observaçoes"
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
              name="servicos"
              value={servicos[index].quantidade}
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
      <Button type="primary" onClick={gerarPDF}>
        Enviar
      </Button>
    </>
  );
};

export default Forms;
