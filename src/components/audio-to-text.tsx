"use client";

import {useState, useRef, useCallback} from "react";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {useToast} from "@/hooks/use-toast";
import {audioToText} from "@/ai/flows/audio-to-text"; // Import the Genkit flow
import {Textarea} from "@/components/ui/textarea"; // Import Textarea

export function AudioToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [transcription, setTranscription] = useState<string>("");
  const {toast} = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, {type: "audio/wav"});
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        convertToText(audioBlob); // Convert the audio when recording stops
        audioChunks.current = [];
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error: any) {
      console.error("Error starting recording:", error);
      toast({
        title: "Error",
        description: "Failed to start recording. Please check your microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const convertToText = useCallback(
    async (audioBlob: Blob) => {
      setIsProcessing(true);
      try {
        try {
          const base64Audio = await blobToBase64(audioBlob);
          // Call Genkit flow here to process audio and get the transcription
          const result = await audioToText({audioUrl: base64Audio});

          setTranscription(result.text || "No transcription available.");
          toast({
            title: "Transcription Complete",
            description: "Successfully transcribed the audio.",
          });
        } catch (error: any) {
          console.error("Error converting audio to text:", error);
          toast({
            title: "Error",
            description: "Failed to convert audio to text. Please try again.",
            variant: "destructive",
          });
          setTranscription("Error during transcription.");
        }
      } catch (error: any) {
        console.error("Error converting audio to text:", error);
        toast({
          title: "Error",
          description: "Failed to convert audio to text. Please try again.",
          variant: "destructive",
        });
        setTranscription("Error during transcription.");
      } finally {
        setIsProcessing(false);
      }
    },
    [toast]
  );

  // Utility function to convert Blob to Base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex space-x-4">
        <Button
          onClick={startRecording}
          disabled={isRecording || isProcessing}
          variant="secondary"
          className="text-lg px-6 py-3"
        >
          <Icons.play className="mr-2 h-5 w-5"/>
          Start Recording
        </Button>
        <Button
          onClick={stopRecording}
          disabled={!isRecording || isProcessing}
          variant="secondary"
          className="text-lg px-6 py-3"
        >
          <Icons.pause className="mr-2 h-5 w-5"/>
          Stop Recording
        </Button>
      </div>
      {audioURL && (
        <audio controls src={audioURL} className="w-full"/>
      )}
      <div>
        <p className="text-xl">
          Transcription:
        </p>
        {isProcessing ? (
          <p>Processing...</p>
        ) : (
          <Textarea // Using Textarea component for the transcription
            placeholder="Decoded text will appear here"
            value={transcription}
            readOnly
            className="mt-2 w-full h-32 text-lg"
          />
        )}
      </div>
    </div>
  );
}
