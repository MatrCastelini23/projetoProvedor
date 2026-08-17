import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import DetalhesProvedor from "./pages/DetalhesProvedor"
import Planos from "./pages/Planos"
import Footer from "./components/layoout/Footer"
import Header from "./components/layoout/Header"
import { PrivateRoute } from "./services/PrivateRoute"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/provedores" element={<DetalhesProvedor />} />
        <Route path="/planos" element={<PrivateRoute><Planos /></PrivateRoute>} />
      </Routes>


      <Footer />
    </div>
  )
}


export default App