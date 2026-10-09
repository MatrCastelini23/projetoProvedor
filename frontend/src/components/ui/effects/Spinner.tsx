import { ClipLoader } from "react-spinners"
import { Header } from "../../layoout/Header"
import { Footer } from "../../layoout/Footer"

function Spinner() {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center rounded-2xl">
          <ClipLoader
            color="blue"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Spinner