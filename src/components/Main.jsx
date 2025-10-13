import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import  { useEffect, useRef, useState } from 'react'
import {auth, db } from '../firebase'
import Message from './Message'
import Arrow from './Arrow';

const Main = ({room}) => {
  const [messages, setMessages] = useState([])
  const [isAtBottom, setIsAtBottom] = useState(true)
  const lastMsgRef = useRef()
  const containerRef = useRef()

  useEffect(()=> {
    // abone olunacak kolleksiyonun refersansını al
  const collectionRef = collection(db,"messages")
//sorgu ayarlarını yap
  const q = query(collectionRef,where("room", "==", room), orderBy("createdAt", "asc"))
    // verdiğimiz kolleksiyona bir dinleyici yerleştirip kolleksiyondaki her güncellemede güncel verileri fonksiyona data parametresi olarak aktarır
     const unsub = onSnapshot(q,(data) => {
      // mesajların geçici tutulduğu dizi
      const temp = []

      // bütün belgelerin içindeki verilere erişip geçici diziye ekle
      data.docs.forEach((doc) =>{
        temp.push(doc.data())
      })

      //  mesajlar verilerini state'ine aktar
     setMessages(temp)
    })



    // component ekrandan gittiğinde aboneliği sonlandır
    return () => unsub();
  },[room])

  useEffect(() => {
    // her mesaj geldiğinde son mesajın görünebilmesi için scroll yap
   if (messages.length > 0) {
    const lastMsg = messages[messages.length - 1]

    if (lastMsg.author.id === auth.currentUser.uid) {
      // eğer son mesajı oturumu açan kullanıcı göndermişse her kosulda en aşağıya kaydır
      scrollToBottom()}
      else if (isAtBottom) {
      // eğer son mesajı farklı bir kullanıcı attıysa sadece isAtBottom true ise en aşşağıya kaydır

      scrollToBottom()
    }
   }

  }, [messages])

  // en aşağıya kaydırma fonksiyonu
  const scrollToBottom = () => {
    lastMsgRef.current?.scrollIntoView({behavior: "smooth"})
  }

  // scrol yukarıdamı aşağıdamı kontrol et

  const handleScroll = () => {
    const {scrollTop, scrollHeight, clientHeight} = containerRef.current
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 200)
  }
  return (
    <main 
    ref={containerRef}
    onScroll={handleScroll}
    className='flex-1 p-3 flex flex-col overflow-y-auto gap-3 w-full relative'>
      {messages.length<1 ? (
        <div>  <p>Sohbete ilk mesajı gönderin</p></div>
       ): ( messages.map((i,key) => <Message key= {key} data={i} />))}

     <div ref={lastMsgRef} />

    <Arrow 
      isAtBottom={isAtBottom}
      handleScroll={scrollToBottom}
    />
    </main>
  )
}

export default Main