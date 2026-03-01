import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({
      error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to environment variables.'
    });
  }

  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text prompt is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert prompt engineer. Enhance the user prompt into a vivid, detailed AI image generation prompt. Add visual detail, lighting, style, and composition. Return only the enhanced text.',
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_tokens: 500,
    });

    const enhanced = completion.choices[0].message.content.trim();
    return res.status(200).json({ enhanced });
  } catch (error) {
    console.error('Enhance error:', error.message);
    return res.status(500).json({ error: 'Failed to enhance prompt. Check API key and quota.' });
  }
}
