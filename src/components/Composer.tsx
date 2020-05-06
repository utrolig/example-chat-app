import React, { useState, useRef } from "react";
import styled from "styled-components";

type ComposerProps = {
  onMessageSent: (text: string) => void;
};

const Composer: React.FC<ComposerProps> = ({ onMessageSent }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const submit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onMessageSent(trimmedValue);
      textareaRef.current!.innerText = "";
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // We only care about the Enter key.
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <ComposerContainer>
      <TextArea
        rows={3}
        onKeyDown={handleKeyDown}
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
    </ComposerContainer>
  );
};

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
