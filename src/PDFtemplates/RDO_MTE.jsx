import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const RDO_MTE = ({
  dataAtual,
  projeto,
  local,
  encarregado,
  observacoes,
  maoDeObra,
  clima,
  servicos,
  dataDaProducao,
}) => {
  const doc = new jsPDF()
  const logo = new URL('/src/assets/MTELogo.png', import.meta.url).href

  // a4 size [595.28, 841.89]

  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Relatório #00001', 20, 60)
  
  doc.setFontSize(10)
  doc.setFont("helvetica", "italic");
  doc.text('07 setembra 2021', 50, 100)
  doc.addImage(logo, 'png', 595.28, 80, 78, 78)

  // var finalY = doc.lastAutoTable.finalY || 10

  // Cabeçario
  // doc.setFontSize(12)
  // var finalY = doc.lastAutoTable.finalY || 10

  // autoTable(doc, {
  //   startY: finalY + 20,
  //   body: [
  //     { funcao: 'Projeto:', value: `${projeto}` },
  //     { funcao: 'Encarregado:', value: `${encarregado}` },
  //     { funcao: 'Local:', value: `${local}` },
  //     { funcao: 'Data:', value: `${dataDaProducao}` },
  //   ],
  //   showHead: 'firstPage',
  //   styles: { overflow: 'hidden' },
  //   margin: { right: 107 },
  //   theme: 'striped',
  // })
  // Observaçoes
  // doc.setFontSize(12)
  // autoTable(doc, {
  //   startY: finalY + 20,
  //   columns: [
  //     { header: 'Relatos de desvios e/ou retrabalhos', dataKey: 'observaçoes' },
  //   ],
  //   body: [{ observaçoes: `${observacoes}` }],
  //   showHead: 'firstPage',
  //   margin: { left: 107 },
  //   columnStyles: { text: { cellWidth: 'auto' } },
  //   theme: 'striped',
  // })

  // Mão de obra
  // doc.setFontSize(12)
  // var finalY = doc.lastAutoTable.finalY || 10
  // doc.text('Mão de obra', 14, finalY + 25)
  // autoTable(doc, {
  //   startY: finalY + 30,
  //   columns: [
  //     { header: 'Função', dataKey: 'funcao' },
  //     { header: 'Quantidade', dataKey: 'quantidade' },
  //   ],
  //   body: [
  //     { funcao: 'Encarregado', quantidade: `${maoDeObra.encarregado}` },
  //     { funcao: 'Motorista', quantidade: `${maoDeObra.motorista}` },
  //     { funcao: 'Eletricista', quantidade: `${maoDeObra.eletricista}` },
  //     { funcao: 'Auxiliar', quantidade: `${maoDeObra.auxiliar}` },
  //   ],
  //   showHead: 'firstPage',
  //   styles: { overflow: 'hidden' },
  //   margin: { right: 107 },
  //   theme: 'striped',
  // })

  // // Clima
  // doc.setFontSize(12)
  // doc.text('Condições Climaticas', 107, finalY + 25)
  // autoTable(doc, {
  //   startY: finalY + 30,
  //   columns: [
  //     { header: 'Período', dataKey: 'periodo' },
  //     { header: 'Condição', dataKey: 'condição' },
  //   ],
  //   body: [
  //     { periodo: 'Manhã', condição: `${clima.manha}` },
  //     { periodo: 'Tarde', condição: `${clima.tarde}` },
  //   ],
  //   showHead: 'firstPage',
  //   styles: { overflow: 'hidden' },
  //   margin: { left: 107 },
  //   theme: 'striped',
  // })

  // //Serviços
  // var finalY = doc.lastAutoTable.finalY || 10
  // doc.text('Serviços executados', 14, finalY + 25)
  // autoTable(doc, {
  //   startY: finalY + 30,
  //   theme: 'striped',
  //   columns: [
  //     { header: 'Código', dataKey: 'codigo' },
  //     { header: 'Descrição', dataKey: 'descricao' },
  //     { header: 'Quantidade', dataKey: 'quantidade' },
  //   ],
  //   body: servicos,
  // })

  doc.save(`${dataDaProducao} ${projeto} ${encarregado} ${local}.pdf`)
}

export default RDO_MTE
