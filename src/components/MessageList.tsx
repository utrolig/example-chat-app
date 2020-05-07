import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { Message } from "../types/message";
import NoMessages from "./NoMessages";

type MessageListProps = {
  friendName: string;
  messages: Message[];
};

const MessageList: React.FC<MessageListProps> = ({ messages, friendName }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.style.scrollBehavior = "smooth";
      el.scrollTop = el.scrollHeight;
      el.style.scrollBehavior = "normal";
    }
  }, [messages]);

  if (!messages || !messages.length) {
    return (
      <MessageListContainer>
        <NoMessages>
          No messages yet! Let {friendName} know you're here to talk!
        </NoMessages>
      </MessageListContainer>
    );
  }

  return (
    <MessageListContainer ref={scrollContainerRef}>
      <MessageListInner>
        {messages.map(({ text, timestamp }) => (
          <MessageBubble key={timestamp}>
            {text.split("\n").map((line, idx) => {
              if (line === "") {
                // Linebreak
                return <br key={idx} />;
              }
              return <span key={idx}>{line}</span>;
            })}
          </MessageBubble>
        ))}
      </MessageListInner>
    </MessageListContainer>
  );
};

export default MessageList;

const MessageListContainer = styled.div`
  background-color: rgb(54, 57, 63);
  color: rgb(220, 221, 222);
  display: flex;
  flex-direction: column;
  grid-area: messagelist;
  padding: 12px 12px 0;
  overflow-y: auto;
`;

const MessageListInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: auto;
`;

const MessageBubble = styled.p`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  margin: 0 0 12px;
`;
