import { Header } from "../../layoout/Header"
import { Footer } from "../../layoout/Footer"
interface IMessageNullProps {
  message: string
}

export const MessageNull = (props: IMessageNullProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <div className="min-h-screen flex flex-col bg-white text-black">
        <h1 className="text-2xl font-bold text-center text-black mb-6">
          {props.message}
        </h1>
      </div>
      <Footer />
    </div>
  )
}