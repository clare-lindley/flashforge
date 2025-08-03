// Document steps and rationale
// fetch over Open AI's client or another lib like axios
//  a. keep the number of dependencies down
//  b. learn the protocol first before abstracting it as makes debugging easier- less of a black box
//  c. get access to latest and beta features - my instance of chatGPT "said" to me "own the abstraction or the abstraction owns you"- and I like that
// we are in the business of UNDERSTANDING here not just getting something working so lets roll
// our sleeves up and dig into the API docs.

// fetch API flashcard
// async/await rules flashcards SyntaxError: await is only valid in async functions and the top level bodies of modules
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
