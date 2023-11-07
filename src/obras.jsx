import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Card, Spin, Typography } from "antd";
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
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  if (error) return `Submission error! ${error.message}`;

  const { getProjetos } = data;

  return (
    <div
      style={{
        display: "flex ",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Title level={4}>Projetos</Title>

      <div
        style={{
          display: "flex",
          width: "100%",
          gap: "10px",
        }}
      >
        <Card
          size="small"
          key={"PCB"}
          title={"PCB"}
          extra={<Link to={`/pcb`}>Gerar RDO</Link>}
          style={{
            width: "100%",
          }}
        />
        <Card
          size="small"
          key={"generica"}
          title={"Genérica"}
          extra={<Link to={`/generica`}>Gerar RDO</Link>}
          style={{
            width: "100%",
          }}
        />
      </div>
      {getProjetos.map((obra) => (
        <Card
          size="small"
          key={obra.projeto}
          title={obra.local}
          extra={<Link to={`/forms/${obra.projeto}`}>Gerar RDO</Link>}
          style={{
            width: "100%",
            margin: "10px",
          }}
        >
          <p>{obra.projeto}</p>
        </Card>
      ))}
    </div>
  );
};

export default Obras;
