'use client'

import { useEffect, useState } from "react";
import { GetMessageApi, Message, SendMessage } from "@/lib/message";
import { Avatar, Button, Chip, Input } from "@nextui-org/react";

export const ChatPage = ({ room_id, user_id }: { room_id: number, user_id: string }) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [text, setText] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const Send = async () => {
    let res = await SendMessage({ room_id: room_id, text: text });
    setText('');
    getMessages();
    console.log(res)
  };

  const getMessages = () => {
    (async () => {
      let res = await GetMessageApi({ room_id: Number(room_id) });
      if (res.data) {
        if (typeof res.data != 'string')
          setMessages(res.data);
        else
          console.log(res.data);
      } else {
        console.error('not get message')
      }
    })();
  };

  useEffect(() => {
    getMessages();
    const interval = setInterval(() => getMessages(), 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginLeft: '50px', marginRight: '50px' }}>
      {messages.map((message, index) => {
        return UserMessage(message, user_id, index);
      })}

      <div style={{ display: 'flex', margin: '20px' }}>
        <Input type="text" value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key == 'Enter' && !isComposing) Send() }}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        ></Input>
        <Button type="button" onClick={Send} color="primary">Send</Button>
      </div>
    </div >
  );
};

const UserMessage = (message: Message, user_id: string, index: number) => {
  if (message.user.id == user_id) return (
    <div key={index} style={{ display: 'flex', justifyContent: 'right' }}>
      <Chip size="lg" color='default' style={{ margin: '6px' }}>{message.text}</Chip>
      <Avatar name={message.user.id} style={{ margin: '2px' }}></Avatar>
    </div>
  );
  else return (
    <div key={index} style={{ display: 'flex', justifyContent: 'left' }}>
      <Avatar name={message.user.id} style={{ margin: '2px' }}></Avatar>
      <Chip size="lg" color="default" style={{ margin: '6px' }} >{message.text}</Chip>
    </div>
  );
}
