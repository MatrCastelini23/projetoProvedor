export const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-white">Developer:</span>
          <span className="text-amber-400 font-semibold">Matheus Castelini</span>
        </div>

        <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
          <h2 className="font-semibold text-white">Para saber como utilizar:</h2>
          <p className="text-white/80">Clique no link e leia o README do repositório:</p>
          <a
            href="https://github.com/MatrCastelini23/projetoProvedor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-semibold underline underline-offset-4 hover:text-amber-300 transition-colors"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  )
}