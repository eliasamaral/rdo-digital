import React from "react";
import { Link } from "react-router-dom";
import { Card, Space, Typography } from "antd";

import { obras } from "./db";

const { Title } = Typography;

const Obras = () => {
  return (
    <>
      <Title level={4}>Projetos</Title>
      {obras.map((obra) => (
        <Space direction="vertical" key={obra.projeto}>
          <Card
            size="small"
            title={obra.local}
            extra={<Link to={`/forms/${obra.projeto}`}>Gerar RDO</Link>}
            style={{
              width: 320,
            }}
          >
            <p>{obra.projeto}</p>
          </Card>
        </Space>
      ))}
    </>
  );
};

export default Obras;
