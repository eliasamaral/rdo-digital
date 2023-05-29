import React from "react";
import Forms from "./forms";
import Obras from "./obras";

const obra = {
  projeto: 4001312054,
  local: "Muniz",
  srv: [
    {
      codigo: 71010010,
      descricao: "Ant Design Title 1",
    },
    {
      codigo: 31020120,
      descricao: "Ant Design Title 2",
    },
    {
      codigo: 82030915,
      descricao: "Ant Design Title 3",
    },
    {
      codigo: 40250501,
      descricao: "Ant Design Title 4",
    },
  ],
};

const App = () => {
  return (
    <>
      {/* <Obras/> */}
      {/* <Forms obra={obra} /> */}
    </>
  );
};

export default App;
