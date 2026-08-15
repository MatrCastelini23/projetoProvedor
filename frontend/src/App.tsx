import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import DetalhesProvedor from "./pages/DetalhesProvedor"
import Planos from "./pages/Planos"


function App() {
  return (
    <>
      <BrowserRouter>
        <header className="bg-blue-950 text-white border-b-4 border-orange-500 shadow-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="">
              <Link to={"/"}>
                <span>
                  <img className="w-20" src="https://flue.net.br/logo-flue.png" alt="Logo Flue" />
                </span>
              </Link>
            </div>
            <div>
              <nav className="flex items-center gap-6">
                <Link
                  to={"/planos"}
                  className="font-medium hover:text-orange-400 transition-colors"
                >
                  <span>Planos</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="flex-1 bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/provedores" element={<DetalhesProvedor />} />
            <Route path="/planos" element={<Planos />} />
          </Routes>
        </main>

        <footer className="bg-blue-950 text-white border-t-4 border-orange-500 mt-auto">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center gap-1 text-sm">
            <span className="text-gray-300">Developer: </span>
            <span className="text-orange-500 font-semibold">Matheus Castelini</span>
          </div>
        </footer>
      </BrowserRouter>
    </>
  )
}


export default App