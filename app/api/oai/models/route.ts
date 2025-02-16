import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("https://api.openai.com/v1/models", {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching OpenAI models:", error);
        return NextResponse.json(
            { error: "Failed to fetch OpenAI models" },
            { status: 500 }
        );
    }
}