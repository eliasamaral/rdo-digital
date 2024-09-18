import { useMutation, useQuery } from '@apollo/client'
import {
  CREATE_RDO,
  GET_PROJETO,
  UPDATE_STATUS,
  GET_ACTIVITY,
} from '../Schemas'

export function createRDOHook(reportData) {
  const [
    createRDO,
    { data: createRDOData, loading: createRDOLoading, error: createRDOError },
  ] = useMutation(CREATE_RDO)

  const submit = props => createRDO({ variables: props })

  return { createRDOData, createRDOLoading, createRDOError, submit }
}

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

export function createActivityHook() {
  const {
    data: { activities } = {},
    loading,
    error,
  } = useQuery(GET_ACTIVITY)

  return {activities, loading, error}
}
