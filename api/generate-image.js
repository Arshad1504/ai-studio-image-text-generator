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

    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'url',
        });

        const image = response.data[0].url;
        return res.status(200).json({ image });
    } catch (error) {
        console.error('Generate image error:', error.message);
        return res.status(500).json({ error: 'Failed to generate image. Check API key and quota.' });
    }
}
