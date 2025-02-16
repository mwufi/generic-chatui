import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function GET() {
    try {
        const response = await anthropic.models.list();
        return NextResponse.json({ data: response.data });
    } catch (error) {
        console.error('Error fetching Anthropic models:', error);
        return NextResponse.json(
            { error: 'Failed to fetch models' },
            { status: 500 }
        );
    }
} 