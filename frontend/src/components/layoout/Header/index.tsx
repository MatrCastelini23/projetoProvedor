import { Link } from "react-router-dom"

function Header() {

  return (
    <header className="header">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <div>
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
  )
}

export default Header;