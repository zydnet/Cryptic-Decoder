'use server';
/**
 * @fileOverview Converts audio Morse code into readable text.
 *
 * - audioToText - A function that handles the audio to text conversion process.
 * - AudioToTextInput - The input type for the audioToText function.
 * - AudioToTextOutput - The return type for the audioToText function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AudioToTextInputSchema = z.object({
  audioUrl: z.string().describe('The base64 encoded audio file containing Morse code beeps.'),
});
export type AudioToTextInput = z.infer<typeof AudioToTextInputSchema>;

const AudioToTextOutputSchema = z.object({
  text: z.string().describe('The decoded text from the Morse code audio.'),
});
export type AudioToTextOutput = z.infer<typeof AudioToTextOutputSchema>;

export async function audioToText(input: AudioToTextInput): Promise<AudioToTextOutput> {
  return audioToTextFlow(input);
}

const audioToTextPrompt = ai.definePrompt({
  name: 'audioToTextPrompt',
  input: {
    schema: z.object({
      audioUrl: z.string().describe('The base64 encoded audio file containing Morse code beeps.'),
    }),
  },
  output: {
    schema: z.object({
      text: z.string().describe('The decoded text from the Morse code audio.'),
    }),
  },
  prompt: `You are a Morse code expert. You will receive a base64 encoded audio file containing morse code beeps.
Your task is to convert the audio into readable text. Return the decoded text.

Audio: {{audioUrl}}`,
});

const audioToTextFlow = ai.defineFlow<
  typeof AudioToTextInputSchema,
  typeof AudioToTextOutputSchema
>({
  name: 'audioToTextFlow',
  inputSchema: AudioToTextInputSchema,
  outputSchema: AudioToTextOutputSchema,
},
async input => {
  const {output} = await audioToTextPrompt(input);
  return output!;
});
