import React, { useState, useCallback, useRef, useEffect } from "react";
import { Message } from "../types/message";
import FriendsList from "./FriendsList";
import friends from "../data/friends";
import GridLayout from "./GridLayout";
import { useParams, Redirect } from "react-router-dom";
import MessageList from "./MessageList";
import Composer from "./Composer";
import { Friend } from "../types/friend";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [draftMessages, setDraftMessages] = useState<Record<string, string>>(
    {}
  );
  const { friendId } = useParams<{ friendId: string }>();
  const previousFriendId = usePrevious(friendId);
  const [composeText, setComposeText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const trimmedComposeText = composeText.trim();
    if (trimmedComposeText) {
      setDraftMessages((_draftMessages) => ({
        ..._draftMessages,
        [previousFriendId!]: trimmedComposeText,
      }));
    }

    if (draftMessages[friendId]) {
      setComposeText(draftMessages[friendId]);
    } else {
      setComposeText("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendId]);

  const onMessageSent = useCallback(
    (text: string) => {
      const timestamp = Date.now();

      const message = { text, timestamp };

      const withNewMessage = messages[friendId]
        ? [...messages[friendId], message]
        : [message];

      setDraftMessages((_drafts) => ({ ..._drafts, [friendId]: "" }));
      setMessages({ ...messages, [friendId]: withNewMessage });
    },
    [friendId, messages]
  );

  const getMessageCount = useCallback(
    (friendId: string) => {
      return messages[friendId] ? messages[friendId].length : 0;
    },
    [messages]
  );

  const submit = useCallback(() => {
    const trimmedValue = composeText.trim();
    if (trimmedValue) {
      onMessageSent(trimmedValue);
      textareaRef.current!.innerText = "";
      setComposeText("");
    }
  }, [composeText, onMessageSent]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // We only care about the Enter key.
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    },
    [submit]
  );

  const sortingPredicate = (a: Friend, b: Friend) => {
    const aMessages = messages[a.id];
    const bMessages = messages[b.id];

    if (!aMessages && bMessages) return 1;
    if (!bMessages && aMessages) return -1;
    if (!bMessages && !aMessages) return 0;

    const latestA = aMessages[aMessages.length - 1].timestamp;
    const latestB = bMessages[bMessages.length - 1].timestamp;

    return latestB - latestA;
  };

  if (!friends.find((friend) => friend.id === friendId)) {
    return <Redirect to={`/friends/${friends[0].id}`} />;
  }

  return (
    <GridLayout>
      <FriendsList
        friendsOrderPredicate={sortingPredicate}
        getMessageCount={getMessageCount}
        friends={friends}
      />
      <MessageList
        friendName={friends.find((friend) => friend.id === friendId)!.name}
        messages={messages[friendId]}
      />
      <Composer
        onKeyDown={handleKeyDown}
        value={composeText}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setComposeText(e.target.value)
        }
        ref={textareaRef}
        onMessageSent={onMessageSent}
      />
    </GridLayout>
  );
};

export default Chat;

function usePrevious(value: string) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<string>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
