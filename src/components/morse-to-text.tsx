"use client";

import {useState} from "react";
import {MORSE_CODE_MAP} from "@/lib/morse-code-map";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export function MorseToText() {
  const [morse, setMorse] = useState("");
  const [text, setText] = useState("");

  const convertToText = () => {
    const morseArray = morse.split(" ");
    let textResult = "";

    for (let i = 0; i < morseArray.length; i++) {
      const morseChar = morseArray[i];
      if (morseChar) {
        const letter = Object.keys(MORSE_CODE_MAP).find(
          (key) => MORSE_CODE_MAP[key] === morseChar
        );
        if (letter) {
          textResult += letter;
        } else {
          textResult += " ";
        }
      } else {
        textResult += " ";
      }
    }

    setText(textResult);
  };

  return (
    <div className="flex flex-col space-y-6">
      <Textarea
        placeholder="Enter Morse code to convert to text"
        value={morse}
        onChange={(e) => setMorse(e.target.value)}
        className="text-lg"
      />
      <Button onClick={convertToText} className="text-lg px-6 py-3">Convert to Text</Button>
      <div>
        <p className="font-mono text-xl">{text}</p>
      </div>
    </div>
  );
}
