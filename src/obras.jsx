import { EnvironmentFilled } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { Button, Card, Spin, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { GET_PROJETOS, GET_RDOS } from './Schemas'
import dayjs from 'dayjs'

const { Title } = Typography

const Obras = () => {
  // const { data, loading, error } = useQuery(GET_PROJETOS)
  const { data, loading, error } = useQuery(GET_RDOS)

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center',
        }}
      >
        <Spin />
      </div>
    )
  }

  if (error) return `Submission error! ${error.message}`

  const { getRDOS } = data

  // const objetosComStatusUm = getProjetos.filter(objeto => objeto.status === 1)

  function iniciarRota(lat, long) {
    if (!lat && !long) return
    const url = `https://www.google.com/maps?q=${lat},${long}`
    window.open(url, '_blank')
  }

  return (
    <div
      style={{
        display: 'flex ',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Title level={4}>Projetos</Title>

      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: '10px',
        }}
      >
        <Card
          size="small"
          key={'generica'}
          title={'Genérica'}
          extra={<Link to={'/generica'}>Gerar RDO</Link>}
          style={{
            width: '100%',
            marginBottom: "10px"

          }}
        />
      </div>

      {getRDOS.map(i => (
        <Card
          key={i._id}
          style={{
            width: '100%',
            marginBottom: "10px",
          }}
        >
          <p>{`ID: ${i._id}`}</p>
          <p>{`Líder: ${i.encarregado}`}</p>
          <p>{`Criado em: ${dayjs(i.createdAt).format('DD/MM/YY HH:mm')}`}</p>
        </Card>
      ))}
      {/* {objetosComStatusUm.map(obra => (
        <Card
          size="small"
          key={obra.id}
          title={obra.local}
          extra={
            <div>
              <Button
                type="link"
                onClick={() => iniciarRota(obra.coord.x, obra.coord.y)}
              >
                <EnvironmentFilled />
              </Button>
              <Link to={`/forms/${obra.projeto}`}>Gerar RDO</Link>
            </div>
          }
          style={{
            width: '100%',
            margin: '10px',
          }}
        >
          <p>{obra.projeto}</p>
        </Card>
      ))} */}
    </div>
  )
}

export default Obras
