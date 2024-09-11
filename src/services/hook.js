import { useMutation, useQuery } from '@apollo/client'
import { CREATE_RDO, GET_PROJETO, UPDATE_STATUS } from '../Schemas'

/**
 * Função que retorna um hook para criar um relatório diário de obra.
 * @param {Object} reportData - Dados para serem gravados.
 * @returns {Object} Um objeto contendo dados, estado de carregamento e possíveis erros.
 */
export function createRDOHook(reportData) {
  const [
    createRDO,
    { data: createRDOData, loading: createRDOLoading, error: createRDOError },
  ] = useMutation(CREATE_RDO)

  const submit = props => createRDO({ variables: props })

  return { createRDOData, createRDOLoading, createRDOError, submit }
}

/**
 * Função que retorna um hook para buscar um projeto.
 * @param {number} projetoParams - O ID do projeto a ser buscado.
 * @returns {Object} Um objeto contendo dados, estado de carregamento e possíveis erros.
 */
export function getProjetoHook(projetoParams) {
  const {
    data: projetoData,
    loading: projetoLoading,
    error: projetoError,
  } = useQuery(GET_PROJETO, {
    variables: { projeto: projetoParams },
  })

  return { projetoData, projetoLoading, projetoError }
}

/**
 * Função que retorna um hook para atualizar um projeto.
 * @param {id} props - O ID do projeto a ser atualizado.
 * @returns {Object} Um objeto contendo dados, estado de carregamento e possíveis erros.
 */
export function updateStatus() {
  const [
    updateStatus,
    {
      data: updateStatusData,
      loading: updateStatusLoading,
      error: updateStatusError,
    },
  ] = useMutation(UPDATE_STATUS)

  const updateStatusSubmit = props =>
    updateStatus({ variables: { id: props, status: 2 } })

  return {
    updateStatusData,
    updateStatusLoading,
    updateStatusError,
    updateStatusSubmit,
  }
}
