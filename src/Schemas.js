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
    $encarregado: String
    $local: String
    $dataDaProducao: String
    $clima: ClimaInput
    $maoDeObra: maoDeObraInput
    $observacoes: String
    $servicos: [SRVInput]
  ) {
    createRDO(
      data: {
        projeto: $projeto
        diagrama: $diagrama
        encarregado: $encarregado
        local: $local
        dataDaProducao: $dataDaProducao
        clima: $clima
        maoDeObra: $maoDeObra
        observacoes: $observacoes
        servicos: $servicos
      }
    ) {
      _id
      
    }
  }
`;
