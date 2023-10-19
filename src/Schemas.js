import { gql } from "@apollo/client";

export const GET_PROJETOS = gql`
  query {
    getProjetos {
      id
      projeto
      local
    }
  }
`;

export const GET_PROJETO = gql`
  query ($projeto: Float!) {
    getProjeto(projeto: $projeto) {
      projeto
      local
      diagrama
      RDODigital {
        codigo
        descricao
      }
    }
  }
`;

export const CODIGO_BY_TYPE = gql`
  query ($type: String!) {
    codigoByType(type: $type) {
      _id
      description
      code
    }
  }
`;

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
    ) {
      _id
      encarregado
    }
  }
`;
