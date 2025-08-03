/**
 * Improvements
 * - handle race condition - if readline closes before getAResponse() finishes
 * - handle open API errors - consider what these might be, have a look at the API docs
 */

// Expected shape of response.choices as of 08/2025
// Prompt: "Can I have a cup of coffee?"
//
// {
//   choices: [
//     {
//       index: 0,
//       message: {
//         role: "assistant",
//         content: "Of course! While I can’t physically provide one for you, I can guide you on how to make a great cup of coffee. Whether you prefer drip, French press, espresso, or any other method, let me know your preference and I can give you some tips!",
//         refusal: null,
//         annotations: []
//       },
//       logprobs: null,
//       finish_reason: "stop"
//     }
//   ]
// }

import "dotenv/config.js";
import readline from "readline";
const API_URL = "https://api.openai.com/v1/chat/completions";

async function getAResponse(prompt) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100,
    }),
    headers: {
      Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  console.log(result.choices[0].message.content);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Prompt, friend, and enter! ", (prompt) => {
  console.log(`Received: ${prompt}`);
  getAResponse(prompt);
  rl.close();
});
