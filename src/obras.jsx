import React from "react";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";

import { obras } from "./db";

const Obras = () => {
  return (
    <>
      {obras.map((obra) => (
        <Space direction="vertical" size={16} key={obra.projeto}>
          <Card
            size="small"
            title={obra.local}
            extra={<Link to={`/forms/${obra.projeto}`}>Gerar RDO</Link>}
            style={{
              width: 300,
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
