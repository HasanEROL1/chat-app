import EmojiPicker from "emoji-picker-react";
import {addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db,auth } from "../firebase";


const Form = ({room}) => {
    const [text, setText] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // mesaj içeriği boşşa iptal et
        if(!text || text.trim() === "") return;

        // verinin kaydedileceği koleksiyonujn referansını al
      const collectionRef =  collection(db,"messages")

      // ilgili koleksiyona veriyi ekle

      await addDoc(collectionRef,{
        text,
        room,
        author:{
          id: auth.currentUser.uid,
          name: auth.currentUser.displayName,
          photo: auth.currentUser.photoURL,
        },
        createdAt: serverTimestamp(),

      })

      // formu temizle
     setText("")
      setIsOpen(false)
      
    }
  return (
<form className="p-5 border border-gray-200 shadow-lg flex justify-center gap-3 "
onSubmit={handleSubmit}

>
    <input type="text" 
    placeholder="Mesajınızı yazınız..."
    onChange={(e) => setText(e.target.value)}
    value={text}
    className="border border-gray-200 shadow-sm p-2 px-4  rounded-md w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    />
   <div className="relative">

    <div className="absolute top-[-470px] right-[-140px] " >
         <EmojiPicker open={isOpen}
         onEmojiClick={(e)=> setText(text + e.emoji)}
          />

   </div>
    <button 
    type="button"
    className="btn"
    onClick={() => setIsOpen(!isOpen)}
     >😊</button>
   </div>
          <button type="submit"
              className="btn text-base"
          >Gönder</button>

   
</form>
  )
}

export default Form