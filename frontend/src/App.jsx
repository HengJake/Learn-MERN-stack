import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../component/NavBar";
import HomePage from "../pages/HomePage";
import CreatePage from "../pages/CreatePage";
import { useProductStore } from "/store/product";

function App() {
  const { product } = useProductStore();

  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.800")}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
