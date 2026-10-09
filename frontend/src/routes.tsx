import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Planos } from "./pages/Planos"
import { Provedores } from "./pages/Providers"
import { ProviderDetails } from "./pages/Providers/ProviderDetails"
import { NoPage } from "./pages/NoPage"



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
        <Route
          path="/provedores"
          element={<Provedores />}
        />
        <Route
          path="/provedor/:id"
          element={<ProviderDetails />}
        />
        <Route
          path="*"
          element={<NoPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}