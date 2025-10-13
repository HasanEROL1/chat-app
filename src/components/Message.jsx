import { auth } from "../firebase";
import getUserColor from "../utils/getUserColor";

const Message = ({ data }) => {
  // Eğer mesajı şu anki kullanıcı göndermişse
  if (data.author.id === auth.currentUser.uid) {
    return (
      <p className="bg-black text-white rounded-[7px_7px_0_7px] self-end message">
        {data.text}
      </p>
    );
  }

  // Eğer mesaj başka bir kullanıcı tarafından gönderilmişse
  return (
    <div className="flex items-start gap-1">
      <img
        className="w-[40px] h-[40px] rounded-full mr-2"
        src={data.author.photo}
        alt="kullanıcı fotoğrafı"
      />
      <div className="flex flex-col gap-1 w-full">
        <span
          className="font-bold whitespace-nowrap text-zinc-700"
          style={{
            color: getUserColor(data.author),
          }}
        >
          {data.author.name}
        </span>
        <p className="message text-zinc-800 bg-zinc-200 rounded-[0_7px_7px_7px]">
          {data.text}
        </p>
      </div>
    </div>
  );
};

export default Message;