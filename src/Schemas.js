import { gql } from "@apollo/client";


export const CREATE_RDO = gql`
  mutation (
    $projeto: Float
    $diagrama: Float
    $local: String
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
        encarregado: $encarregado
        diagrama: $diagrama
        local: $local
        encarregadoQuantidade: $encarregadoQuantidade
        dataDaProducao: $dataDaProducao
        eletricistaQuantidade: $eletricistaQuantidade
        motoristaQuantidade: $motoristaQuantidade
        auxiliarQuantidade: $auxiliarQuantidade
        climaManha: $climaManha
        climaTarde: $climaTarde
        observacoes: $observacoes
        servicos: $servicos
        }
    ) 
    {
      _id
      encarregado
    }
  }
`;
