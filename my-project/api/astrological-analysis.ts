import { OpenAI } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { PineconeClient } from '@pinecone-database/pinecone';
import { Document } from '@langchain/core/documents';

// Initialize Pinecone client
const pinecone = new PineconeClient();
await pinecone.init({
  environment: process.env.PINECONE_ENVIRONMENT!,
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.Index(process.env.PINECONE_INDEX!);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store astrological knowledge
const vectorStore = await PineconeStore.fromExistingIndex(
  openai.embeddings(),
  { pineconeIndex: index }
);

// Analyze birth details and generate response
export async function analyzeChart(birthDetails: {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}) {
  // Convert birth details to astrological positions
  const positions = await calculatePlanetaryPositions(birthDetails);
  
  // Generate embedding for the query
  const queryEmbedding = await openai.embeddings.create({
    input: `Analyze birth chart for person born on ${birthDetails.dateOfBirth} 
            at ${birthDetails.timeOfBirth} in ${birthDetails.placeOfBirth}`,
  });

  // Search for relevant interpretations
  const results = await vectorStore.similaritySearch(queryEmbedding, 5);

  // Generate personalized reading
  const reading = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are an expert Vedic astrologer. Analyze the birth chart and provide 
                 insights based on planetary positions, dashas, and yogas. Use traditional 
                 Indian astrological terminology and concepts.`
      },
      {
        role: "user",
        content: `Generate a detailed astrological reading for:
                 Name: ${birthDetails.name}
                 Birth Details: ${JSON.stringify(positions)}
                 Context: ${results.map(r => r.pageContent).join('\n')}`
      }
    ]
  });

  return reading.choices[0].message.content;
}