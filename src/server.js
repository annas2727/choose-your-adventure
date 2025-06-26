import express from "express";
import cors from "cors";
import { pipeline } from "@xenova/transformers";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let pipe;

// Load the model once at startup
(async () => {
  console.log("⏳ Loading model...");
  pipe = await pipeline("text2text-generation", "Xenova/flan-t5-base"); //Xenova/flan-t5-base
  console.log("✅ Model loaded.");
})();

// Text generation endpoint
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt in request body." });
  }

  console.log("Received prompt:", prompt);

  try {
    if (!pipe) {
      return res.status(503).json({ error: "Model is still loading. Try again soon." });
    }

    const result = await pipe(prompt, { max_new_tokens: 100 });
    const generated = result[0]?.generated_text || "No story generated.";
    res.json([{ generated_text: generated }]);
    console.log("Generated response:", generated);
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response locally." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
