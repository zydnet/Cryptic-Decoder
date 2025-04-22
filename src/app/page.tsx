"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {TextToMorse} from "@/components/text-to-morse";
import {MorseToText} from "@/components/morse-to-text";
import {AudioToText} from "@/components/audio-to-text";
import {motion} from "framer-motion";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <motion.div className="w-full max-w-3xl p-8"
        initial={{opacity: 0, y: -20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.5}}
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-foreground text-center"
          initial={{opacity: 0, y: -20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5}}
        >
          SpyCode
        </motion.h1>
        <Tabs defaultValue="text-to-morse" className="w-full">
          <TabsList className="bg-muted rounded-md shadow-sm">
            <TabsTrigger value="text-to-morse" className="text-lg font-medium rounded-l-md">Text to Morse</TabsTrigger>
            <TabsTrigger value="morse-to-text" className="text-lg font-medium">Morse to Text</TabsTrigger>
            <TabsTrigger value="audio-to-text" className="text-lg font-medium rounded-r-md">Audio to Text</TabsTrigger>
          </TabsList>
          <TabsContent value="text-to-morse">
            <p className="mb-4 text-sm text-muted-foreground">
              Convert plain text into Morse code. Enter your text and see the Morse code equivalent in real-time.
            </p>
            <TextToMorse/>
          </TabsContent>
          <TabsContent value="morse-to-text">
            <p className="mb-4 text-sm text-muted-foreground">
              Translate Morse code into readable text. Input the Morse code sequence to decode it into understandable text.
            </p>
            <MorseToText/>
          </TabsContent>
          <TabsContent value="audio-to-text">
            <p className="mb-4 text-sm text-muted-foreground">
              Convert audio Morse code into readable text.
            </p>
            <AudioToText/>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

