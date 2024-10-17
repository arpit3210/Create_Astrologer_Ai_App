import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, dateOfBirth, timeOfBirth, placeOfBirth } = body

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert Vedic astrologer. Provide detailed astrological insights 
                   using traditional Indian astrological concepts. Include analysis of:
                   - Rashi (Moon Sign)
                   - Current Dasha period
                   - Important Yogas
                   - Planetary positions and their influences
                   - Predictions and remedies`
        },
        {
          role: "user",
          content: `Generate a detailed Vedic astrological reading for:
                   Name: ${name}
                   Date of Birth: ${dateOfBirth}
                   Time of Birth: ${timeOfBirth}
                   Place of Birth: ${placeOfBirth}
                   
                   Provide insights about their general life path, career, relationships, 
                   and current period.`
        }
      ]
    })

    return NextResponse.json({ 
      reading: completion.choices[0].message.content 
    })
  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Failed to generate astrological reading' },
      { status: 500 }
    )
  }
}