import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Planos from "./pages/Planos"



export const Rotas = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/planos"
          element={<Planos />}
        />
      </Routes>
    </BrowserRouter>
  )
}