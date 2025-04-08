const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// AI Endpoint: Example endpoint for weapon recommendation
app.post('/getWeapon', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: "No text provided." });
    }

    try {
        // Prepare the prompt for the AI
        const prompt = `Based on this description: "${text}", suggest a weapon keyword from the following options: sword, gun, laser, bow.`;

        // Call the OpenAI API (adjust endpoint and parameters as needed)
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci/completions',
            {
                prompt: prompt,
                max_tokens: 5,
                temperature: 0.5,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
                }
            }
        );

        // Process the AI response
        const aiOutput = response.data.choices[0].text.trim().toLowerCase();
        res.json({ weaponKeyword: aiOutput });
    } catch (error) {
        console.error('Error calling AI API:', error.message);
        res.status(500).json({ error: "Error processing your request." });
    }
});

// Basic home route
app.get('/', (req, res) => {
    res.send("AI Weapon Endpoint is running!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
