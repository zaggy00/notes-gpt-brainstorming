// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Placeholder route for testing
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ChatGPT API route
app.post('/chat', async (req, res) => {
  // Extract user input from the request
  const userInput = req.body.userInput;

  // Define the ChatGPT API URL and parameters
  const chatGPTUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const chatGPTParams = {
    prompt: userInput,
    max_tokens: 150,
    n: 1,
    stop: null,
    temperature: 1,
  };
  const chatGPTHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`,
  };

  try {
    // Send a POST request to the ChatGPT API
    const chatGPTResponse = await axios.post(chatGPTUrl, chatGPTParams, { headers: chatGPTHeaders });

    // Extract the response text
    const chatGPTOutput = chatGPTResponse.data.choices[0].text;

    // Send the ChatGPT response to the user
    res.json({ response: chatGPTOutput });
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error communicating with ChatGPT:', error.message);
    res.status(500).json({ error: 'Error communicating with ChatGPT' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
