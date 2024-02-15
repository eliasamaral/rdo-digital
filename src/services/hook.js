import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJETO, CREATE_RDO } from "../Schemas";

/**
 * Função que retorna um hook para criar um relatório diário de obra.
 * @param {Object} reportData - Dados para serem gravados.
 * @returns {Object} Um objeto contendo dados, estado de carregamento e possíveis erros.
 */
export function createRDOHook(reportData) {
  const [
    createRDO,
    { data: createRDOData, loading: createRDOLoading, error: createRDOError },
  ] = useMutation(CREATE_RDO);

  const submit = (props) => createRDO({ variables: props });

  return { createRDOData, createRDOLoading, createRDOError, submit };
}

/**
 * Função que retorna um hook para buscar um projeto.
 * @param {number} id - O ID do projeto a ser buscado.
 * @returns {Object} Um objeto contendo dados, estado de carregamento e possíveis erros.
 */
export function getProjetoHook(id) {
  const {
    data: projetoData,
    loading: projetoLoading,
    error: projetoError,
  } = useQuery(GET_PROJETO, {
    variables: { projeto: id },
  });

  return { projetoData, projetoLoading, projetoError };
}
