import { gql } from '@apollo/client'

export const GET_PROJETOS = gql`
  query {
    getProjetos {
      id
      projeto
      local
      status
      coord {
        x
        y
      }
    }
  }
`

export const GET_RDOS = gql`
  query {
    getRDOS {
      _id
      encarregado
      dataDaProducao
      createdAt
    }
  }
`

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
      }
    }
  }
`

export const CODIGO_BY_TYPE = gql`
  query ($tipo: String!) {
    codigoByType(tipo: $tipo) {
      _id
      descricao
      codigo
    }
  }
`

export const CREATE_RDO = gql`
  mutation (
    $projeto: String
    $encarregado: String
    $local: String
    $dataDaProducao: String
    $clima: ClimaInput
    $maoDeObra: [MaoDeObraInput]
    $observacoes: String
    $atividades: [AtividadeInput]
  ) {
    createRDO(
      data: {
        projeto: $projeto
        encarregado: $encarregado
        local: $local
        dataDaProducao: $dataDaProducao
        clima: $clima
        maoDeObra: $maoDeObra
        observacoes: $observacoes
        atividades: $atividades
      }
    ) {
      _id
    }
  }
`

export const UPDATE_STATUS = gql`
  mutation ($id: ID!, $status: Float) {
    updateStatus(id: $id, status: $status) {
      status
    }
  }
`
