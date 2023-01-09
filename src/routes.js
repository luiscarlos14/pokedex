import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import Favoritos from "./pages/Favoritos";
import Erro from "./pages/Error";

import Header from "./components/Header";


function RoutesApp() {
    return (
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
          <Route path="/favoritos" element={<Favoritos />} />
  
          <Route path="*" element={<Erro />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default RoutesApp;