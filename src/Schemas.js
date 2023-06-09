import { gql } from "@apollo/client";


export const CREATE_RDO = gql`
  mutation (
    $projeto: Float
    $auxiliarQuantidade: Int
    $eletricistaQuantidade: Int
    $encarregadoQuantidade: Int
    $motoristaQuantidade: Int
    $climaManha: String
    $climaTarde: String
    $dataDaProducao: String
    $encarregado: String
    $observacoes: String
    $servicos: [SRVInput]

    
  ) {
    createRDO(
      data: {
        projeto: $projeto
        auxiliarQuantidade: $auxiliarQuantidade
        eletricistaQuantidade: $eletricistaQuantidade
        encarregadoQuantidade: $encarregadoQuantidade
        motoristaQuantidade: $motoristaQuantidade
        climaManha: $climaManha
        climaTarde: $climaTarde
        dataDaProducao: $dataDaProducao
        encarregado: $encarregado
        observacoes: $observacoes
        servicos: $servicos
        }
    ) 
    {
      id
      encarregado
    }
  }
`;
