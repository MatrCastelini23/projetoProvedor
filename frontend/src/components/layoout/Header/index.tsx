import { useNavigate } from "react-router-dom"

const NAV_LINKS = [
  { id: 0, path: "/", label: "Home" },
  { id: 1, path: "/planos", label: "Planos" },
  { id: 2, path: "/provedores", label: "Provedores" },
  { id: 3, path: "/relatorios", label: "Relatorios" }
]

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <nav>
        <img src="" alt="" />
        {NAV_LINKS.map((nav) => (
          <ul key={nav.id}>
            <li>
              <button
                onClick={() => navigate(nav.path)}
              >
                {nav.label}
              </button>
            </li>
          </ul>
        ))}
      </nav>
    </header>
  )
}
