"use client";

import {useState} from "react";
import {MORSE_CODE_MAP} from "@/lib/morse-code-map";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export function TextToMorse() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const convertToMorse = () => {
    const morseCode = text
      .toUpperCase()
      .split("")
      .map((char) => MORSE_CODE_MAP[char] || " ")
      .join(" ");
    setMorse(morseCode);
  };

  return (
    <div className="flex flex-col space-y-6 p-4">
      <Textarea
        placeholder="Enter text to convert to Morse code"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-lg p-4"
      />
      <Button onClick={convertToMorse} className="text-lg px-6 py-3">Convert to Morse Code</Button>
      <div>
        <p className="font-mono text-xl">{morse}</p>
      </div>
    </div>
  );
}

