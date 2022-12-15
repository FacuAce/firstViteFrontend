import { useState } from "react";
import { MantineProvider } from "@mantine/core";
import ArticulosPages from "./pages/articulosPage/ArticulosPage";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider
      theme={{
        fontFamily: "cursive",
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="App">
        <div className="contenedor-principal">
          <ArticulosPages></ArticulosPages>
        </div>
      </div>
    </MantineProvider>
  );
}

export default App;
