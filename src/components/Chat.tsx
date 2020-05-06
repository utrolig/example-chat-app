import React, { useState } from "react";
import { Message } from "../types/message";
import FriendsList from "./FriendsList";
import friends from "../data/friends";
import GridLayout from "./GridLayout";
import { useParams, Redirect } from "react-router-dom";
import MessageList from "./MessageList";
import Composer from "./Composer";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const { friendId } = useParams<{ friendId: string }>();

  const onMessageSent = (text: string) => {
    const timestamp = Date.now();

    const message = { text, timestamp };

    const withNewMessage = messages[friendId]
      ? [...messages[friendId], message]
      : [message];

    setMessages({ ...messages, [friendId]: withNewMessage });
  };

  const getMessageCount = (friendId: string) => {
    return messages[friendId] ? messages[friendId].length : 0;
  };

  if (!friends.find((friend) => friend.id === friendId)) {
    return <Redirect to={`/friends/${friends[0].id}`} />;
  }

  return (
    <GridLayout>
      <FriendsList getMessageCount={getMessageCount} friends={friends} />
      <MessageList
        friendName={friends.find((friend) => friend.id === friendId)!.name}
        messages={messages[friendId]}
      />
      <Composer onMessageSent={onMessageSent} />
    </GridLayout>
  );
};

export default Chat;
