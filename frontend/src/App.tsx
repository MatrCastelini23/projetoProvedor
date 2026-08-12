import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import DetalhesProvedor from "./pages/DetalhesProvedor"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Home />
          } />
        <Route path="/provedores" element={<DetalhesProvedor />} />
      </Routes>
    </BrowserRouter>
  )
}


export default App