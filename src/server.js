const express = require('express');
const axios = require('axios'); // used for making HTTP requests
const cors = require('cors'); // used for enabling CORS

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
    const response = await axios.post(
        "https://api-inference.huggingface.co/models/google/flan-t5-base"
,
        { inputs: prompt },
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );
    res.json(response.data); 
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'Failed to generate response' });
    }
});

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
