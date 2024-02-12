import { gql } from "@apollo/client";

export const GET_PROJETOS = gql`
  query {
    getProjetos {
      id
      projeto
      local
      coord{
        x
        y
      }
    }
  }
`;

export const GET_PROJETO = gql`
  query ($projeto: Float!) {
    getProjeto(projeto: $projeto) {
      id
      projeto
      local
      diagrama
      srv {
        codigo
        descricao
        qntOrcada
      }
    }
  }
`;

export const CODIGO_BY_TYPE = gql`
  query ($tipo: String!) {
    codigoByType(tipo: $tipo) {
      _id
      descricao
      codigo
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
    $isFinal: Boolean
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
        isFinal: $isFinal
        servicos: $servicos
      }
    ) {
      _id
      
    }
  }
`;
