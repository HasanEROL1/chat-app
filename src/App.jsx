import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import LoginPage from "./pages/LoginPage"
import RoomPage from './pages/RoomPage';
import { useEffect, useState } from "react";
import ChatPage from './pages/ChatPage';
import Loader from "./components/Loader";


const App = () => {
const[user, setUser] = useState(undefined)
const [room, setRoom] = useState(null)
  // kullanıcı oturumu her açtığında güncel bilgileri getirir
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // kullanıcı sayfadan ayrılınca oturuumu kapatır

    return() => unsub()

   }, []);


  // kullanıcı bilgisi henüz gelmediyse
  if (user === undefined) return <Loader />;


   // kullanıcı oturumu açmadıysa
   if (user === null) 
    return <LoginPage  />;

    // kullanıcı oturum açtıysa ve oda seçtiyse
    if (room) return <ChatPage  room={room} setRoom={setRoom} />;
  

  
  
  //kullanıcı oturum açtıysa ve oda seçmediyse
   return <RoomPage setRoom={setRoom} />;  
};

export default App;
