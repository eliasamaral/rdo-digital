import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const template1 = (
  dataAtual,
  projeto,
  encarregado,
  getProjeto,
  observacoes,
  encarregadoQuantidade,
  motoristaQuantidade,
  eletricistaQuantidade,
  auxiliarQuantidade,
  climaManha,
  climaTarde,
  servicos,
  dataDaProducao
) => {
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
      { funcao: "Local:", value: `${getProjeto.local}` },
      { funcao: "Data:", value: `${dataDaProducao}` },
    ],
    showHead: "firstPage",
    styles: { overflow: "hidden" },
    margin: { right: 107 },
  });
  // Observaçoes
  doc.setFontSize(12);
  autoTable(doc, {
    startY: finalY + 20,
    columns: [{ header: "Observações", dataKey: "observaçoes" }],
    body: [{ observaçoes: `${observacoes}` }],
    showHead: "firstPage",
    margin: { left: 107 },
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

  doc.save(`${dataDaProducao} ${projeto} ${encarregado} ${getProjeto.local}.pdf`);
};

export const template2 = (
  dataAtual,
  projeto,
  encarregado,
  getProjeto,
  observacoes,
  encarregadoQuantidade,
  motoristaQuantidade,
  eletricistaQuantidade,
  auxiliarQuantidade,
  climaManha,
  climaTarde,
  dataDaProducao
) => {
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

  doc.text("Cabeçario", 14, finalY + 25);
  autoTable(doc, {
    startY: finalY + 30,
    body: [
      { funcao: "Projeto:", value: `${projeto}` },
      { funcao: "Encarregado:", value: `${encarregado}` },
      { funcao: "Local:", value: `${getProjeto.local}` },
      { funcao: "Data:", value: `${dataDaProducao}` },
    ],
    showHead: "firstPage",
    styles: { overflow: "hidden" },
    margin: { right: 107 },
    // theme: 'plain',
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
    styles: { overflow: "hidden" },
    margin: { left: 107 },
  });

  // Mão de obra
  doc.setFontSize(12);
  var finalY = doc.lastAutoTable.finalY || 10;
  doc.text("Mão de obra", 14, finalY + 20);
  autoTable(doc, {
    startY: finalY + 25,
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
    margin: { right: 107 },
  });

  // Observaçoes
  doc.setFontSize(12);
  autoTable(doc, {
    columns: [{ header: "Observações", dataKey: "observaçoes" }],
    body: [{ observaçoes: `${observacoes}` }],
    showHead: "firstPage",
    columnStyles: { text: { cellWidth: "auto" } },
  });

  doc.save(`${dataDaProducao} ${projeto} ${encarregado} ${getProjeto.local}.pdf`);
};
