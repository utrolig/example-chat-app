import React from "react";
import styled from "styled-components";

type ComposerProps = React.HTMLProps<HTMLTextAreaElement> & {
  onMessageSent: (text: string) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const Composer = React.forwardRef<HTMLTextAreaElement, ComposerProps>(
  ({ as: _as, onMessageSent, value, onChange, ...rest }, ref) => {
    return (
      <ComposerContainer>
        <TextArea
          {...rest}
          rows={3}
          value={value}
          onChange={onChange}
          placeholder="Start typing here..."
          ref={ref}
        />
      </ComposerContainer>
    );
  }
);

export default Composer;

const ComposerContainer = styled.div`
  background-color: rgb(0, 0, 0, 0.15);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  grid-area: composer;
  padding: 12px;
  margin: 12px;
`;

const TextArea = styled.textarea`
  background-color: transparent;
  border: 0;
  color: rgb(220, 221, 222);
  font-family: inherit;
  min-height: 40px;
  resize: none;
  outline: 0;
`;
