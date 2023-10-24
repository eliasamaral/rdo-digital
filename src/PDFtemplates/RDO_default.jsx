import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RDO_default = ({
  dataAtual,
  projeto,
  local,
  encarregado,
  observacoes,
  maoDeObra,
  clima,
  servicos,
  dataDaProducao,
  isFinal,
  fichaTrafo
}) => {
  const doc = new jsPDF();
  const logo = new URL( "/src/assets/volt.png", import.meta.url).href
  
  doc.addImage(logo, "png", 15, 10, )

  doc.setFontSize(16);
  var finalY = doc.lastAutoTable.finalY || 10;
  doc.text("Relatório de Obras", 80, finalY + 8);

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
      { funcao: "Local:", value: `${local}` },
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
      { funcao: "Encarregado", quantidade: `${maoDeObra.encarregado}` },
      { funcao: "Motorista", quantidade: `${maoDeObra.motorista}` },
      { funcao: "Eletricista", quantidade: `${maoDeObra.eletricista}` },
      { funcao: "Auxiliar", quantidade: `${maoDeObra.auxiliar}` },
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
      { periodo: "Manhã", condição: `${clima.manha}` },
      { periodo: "Tarde", condição: `${clima.tarde}` },
    ],
    showHead: "firstPage",
    styles: { overflow: "hidden" },
    margin: { left: 107 },
  });

    // Ficha Transformador
    doc.setFontSize(12);
    var finalY = doc.lastAutoTable.finalY || 10;
    doc.text(`Ficha Transformador ESTF${fichaTrafo.estf} N° Série ${fichaTrafo.nSerie}`, 14, finalY + 25);
    autoTable(doc, {
      startY: finalY + 30,
      columns: [
        { header: "Bucha", dataKey: "bucha" },
        { header: "Tensão", dataKey: "tensao" },
      ],
      body: [
        { bucha: "NA", tensao: `${fichaTrafo.NA}` },
        { bucha: "NB", tensao: `${fichaTrafo.NB}` },
        { bucha: "NC", tensao: `${fichaTrafo.NC}` },
       
      ],
      showHead: "firstPage",
      styles: { overflow: "hidden" },
      margin: { right: 107 },
    });

     doc.setFontSize(12);
     autoTable(doc, {
       startY: finalY + 30,
       columns: [
         { header: "Bucha", dataKey: "bucha" },
         { header: "Tensão", dataKey: "tensao" },
       ],
       body: [
        { bucha: "AB", tensao: `${fichaTrafo.AB}` },
        { bucha: "AC", tensao: `${fichaTrafo.AC}` },
        { bucha: "BC", tensao: `${fichaTrafo.BC}` },
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

  if (isFinal) {
    // Obra Final
    doc.setFontSize(12);
    autoTable(doc, {
      body: [
        [
          {
            content: "Obra Finalizada",
            rowSpan: 1,
            styles: {
              halign: "center",
              fillColor: [231, 76, 60],
              fontStyle: "bold",
              textColor: "#fff",
            },
          },
        ],
      ],
    });
  }

  doc.save(`${dataDaProducao} ${projeto} ${encarregado} ${local}.pdf`);
};

export default RDO_default;
