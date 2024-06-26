'use client'
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useConversation from "@/app/hooks/useConversation";
interface BodyProps {
  initialMessages: FullMessageType[];
}

import { FullMessageType } from "@/app/types";
import MessageBox from "./MessageBox";
const Body: React.FC<BodyProps> = ({ initialMessages = [] }) => {

  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className=" flex-1 overflow-y-auto h-[34vw]">
         {messages.map((message, i) => (
        <MessageBox 
          isLast={i === messages.length - 1} 
          key={message.id} 
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  )
}

export default Body