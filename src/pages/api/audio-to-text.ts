import type {NextApiRequest, NextApiResponse} from 'next';
import {audioToText} from '@/ai/flows/audio-to-text';

type Data = {
  text?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const {audio} = req.body;

    try {
      // Call the Genkit flow to convert audio to text
      const result = await audioToText({audioUrl: audio});
      res.status(200).json({text: result.text});
    } catch (error: any) {
      console.error('Error during audio to text conversion:', error);
      res.status(500).json({error: error.message || 'Failed to convert audio to text'});
    }
  } else {
    res.status(405).json({error: 'Method Not Allowed'});
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};
