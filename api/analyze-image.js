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

    const { imageBase64 } = req.body;

    if (!imageBase64) {
        return res.status(400).json({ error: 'Image data is required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'text',
                            text: 'Analyze this image and generate a concise but descriptive analysis. Describe the subject, lighting, style, and mood. Keep it short so it can be used as a prompt for a variation.',
                        },
                        {
                            type: 'image_url',
                            image_url: {
                                url: imageBase64,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 300,
        });

        const analysis = response.choices[0].message.content.trim();
        return res.status(200).json({ analysis });
    } catch (error) {
        console.error('Analyze image error:', error.message);
        return res.status(500).json({ error: 'Failed to analyze image. Check API key and quota.' });
    }
}
