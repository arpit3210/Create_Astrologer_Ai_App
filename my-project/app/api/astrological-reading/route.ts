import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined');
}
const genAI = new GoogleGenerativeAI(apiKey);

interface AstrologicalReadingRequest {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

async function generateAstrologicalReading(body: AstrologicalReadingRequest) {
  const { name, dateOfBirth, timeOfBirth, placeOfBirth } = body;

  const prompt = `You are an expert Vedic astrologer. Provide detailed astrological insights 
    using traditional Indian astrological concepts. Include analysis of:
    - Rashi (Moon Sign)
    - Current Dasha period
    - Important Yogas
    - Planetary positions and their influences
    - Predictions and remedies

    Name: ${name}
    Date of Birth: ${dateOfBirth}
    Time of Birth: ${timeOfBirth}
    Place of Birth: ${placeOfBirth}
    
    Provide insights about their general life path, career, relationships, 
    and current period.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([prompt]);
    return result.response.text();
  } catch (error) {
    console.error('Error generating reading:', error);
    throw new Error('Failed to generate astrological reading');
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const reading = await generateAstrologicalReading(body);

    return NextResponse.json({
      reading,
    });
  } catch (error) {
    const errorMessage = (error as Error).message; // Type assertion
    console.error(errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
