import { Header } from "../../layoout/Header"
import { Footer } from "../../layoout/Footer"
interface IMessageNullProps {
  message: string
}

export const MessageNull = (props: IMessageNullProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center rounded-2xl border-2 border-amber-700 shadow-md p-10">
          <h1 className="text-8xl font-extrabold text-blue-950">{props.message}</h1>
        </div>
      </main>
      <Footer />
    </div>
  )
}