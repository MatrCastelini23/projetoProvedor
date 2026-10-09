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
    <header className="bg-blue-950 text-white shadow-md">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-8">
        <img src="/logoHeader.png" alt="Logo" className="h-10 w-auto" />
        <ul className="flex items-center gap-2">
          {NAV_LINKS.map((nav) => (
            <li key={nav.id}>
              <button
                onClick={() => navigate(nav.path)}
                className="px-3 py-2 rounded-lg font-medium text-white hover:bg-white/10 hover:text-amber-400 transition-colors"
              >
                {nav.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}