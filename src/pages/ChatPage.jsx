import Form from "../components/Form"
import Header from "../components/Header"
import Main from "../components/Main"
import { auth } from "../firebase"



const ChatPage = ({room, setRoom}) => {
  return (
    <div className="h-screen md:grid md:place-items-center ">
      <div className="bg-white text-darkgray md:w-[80vw] md:max[600px] h-screen md:h-[80vh] md:rounded-md overflow-hidden flex flex-col">

  <Header room= {room} setRoom= {setRoom}
     />

   <Main room={room}/>


   <Form room={room} />

      </div>
    </div>
  )
}

export default ChatPage