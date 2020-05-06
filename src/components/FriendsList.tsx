import React from "react";
import styled from "styled-components";
import { Friend } from "../types/friend";
import { NavLink } from "react-router-dom";

type FriendsListProps = {
  friends: Friend[];
  getMessageCount: (friendId: string) => number;
};

const FriendsList: React.FC<FriendsListProps> = ({
  friends,
  getMessageCount,
}) => (
  <FriendsListWrapper>
    <FriendsListTitle>Friends</FriendsListTitle>
    <FriendsListContainer>
      {friends.map(({ avatarUrl, id, name }) => (
        <FriendLink key={id} title={name} to={`/friends/${id}`}>
          <FriendAvatar src={avatarUrl} />
          <FriendName>{name}</FriendName>
          {(() => {
            const messageCount = getMessageCount(id);
            if (messageCount === 0) return null;
            if (messageCount > 9) return <MessageCount>9+</MessageCount>;
            return <MessageCount>{messageCount}</MessageCount>;
          })()}
        </FriendLink>
      ))}
    </FriendsListContainer>
  </FriendsListWrapper>
);

export default FriendsList;

const MessageCount = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 100%;
  display: flex;
  color: rgba(255, 255, 255, 0.25);
  height: 24px;
  width: 24px;
  justify-content: center;
  margin-left: auto;
  font-size: 12px;
`;

const FriendsListWrapper = styled.div`
  background-color: rgb(47, 49, 54);
  color: rgb(220, 221, 222);
  display: flex;
  flex-direction: column;
  grid-area: friendslist;
`;

const FriendsListTitle = styled.p`
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  display: block;
  font-weight: 800;
  margin: 0;
  padding: 12px;
`;

const FriendsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 24px;
`;

const FriendLink = styled(NavLink)`
  align-items: center;
  border-radius: 10px;
  color: inherit;
  display: flex;
  padding: 8px 12px;
  margin: 4px 8px;
  text-decoration: none;

  &.active,
  &.active:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const FriendAvatar = styled.img`
  display: block;
  object-fit: contain;
  object-position: center;
  height: 32px;
  width: 32px;
`;

const FriendName = styled.span`
  display: block;
  margin-left: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 8px;
  overflow: hidden;
`;
