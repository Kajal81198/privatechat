import React, { useState } from "react";
import Picker from "emoji-picker-react";

function Emojicheck() {
  const [inputField, setInputField] = useState("");

  function emojiNameToUnicode(name) {
    return String.fromCodePoint(...name.split("-").map(n => parseInt(n, 16)));
  }

  function handleEmojiClick(event, emojiObject) {
    const emojiUnicode = emojiNameToUnicode(emojiObject.emoji);
    setInputField(prevValue => prevValue + emojiUnicode);
  }

  return (
    <div>
      <input value={inputField} />
      <Picker onEmojiClick={handleEmojiClick} />
    </div>
  );
}

export default Emojicheck;
