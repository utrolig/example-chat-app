import React from "react";
import styled from "styled-components";
import chatIcon from "../assets/chat.svg";

const NoMessages: React.FC = ({ children }) => {
  return (
    <NoMessagesContainer>
      <Icon src={chatIcon} />
      <MessagePlaceholder>{children}</MessagePlaceholder>
    </NoMessagesContainer>
  );
};

export default NoMessages;

const NoMessagesContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

const Icon = styled.img`
  display: block;
  height: 300px;
`;

const MessagePlaceholder = styled.span`
  color: rgba(255, 255, 255, 0.2);
  margin-top: 12px;
`;
