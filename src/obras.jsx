import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Card, Space, Spin, Typography } from "antd";
import { GET_PROJETOS } from "./Schemas";

const { Title } = Typography;

const Obras = () => {
  const { data, loading, error } = useQuery(GET_PROJETOS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  const { getProjetos } = data;

  return (
    <Space direction="vertical" align="center">
      <Title level={4}>Projetos</Title>

      <Card
        size="small"
        key={1}
        title={"PCB"}
        extra={<Link to={`/pcb`}>Gerar RDO</Link>}
        style={{
          width: 300,
        }}
      />
      {getProjetos.map((obra) => (
        <Card
          size="small"
          key={obra.projeto}
          title={obra.local}
          extra={<Link to={`/forms/${obra.projeto}`}>Gerar RDO</Link>}
          style={{
            width: 300,
          }}
        >
          <p>{obra.projeto}</p>
        </Card>
      ))}
    </Space>
  );
};

export default Obras;
