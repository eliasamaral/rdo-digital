import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { Card, Spin, Typography, Button } from "antd";
import { EnvironmentFilled } from "@ant-design/icons";
import { GET_PROJETOS } from "./Schemas";

const { Title } = Typography;

const Obras = () => {
  const { data, loading, error } = useQuery(GET_PROJETOS);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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

  const objetosComStatusUm = getProjetos.filter(
    (objeto) => objeto.status === 1
  );


  function iniciarRota(lat, long) {
    if (!lat && !long) return;
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(url, "_blank");
  }

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
          key={"generica"}
          title={"Genérica"}
          extra={<Link to={`/generica`}>Gerar RDO</Link>}
          style={{
            width: "100%",
          }}
        />
      </div>
      {objetosComStatusUm.map((obra) => (
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
