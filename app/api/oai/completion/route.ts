import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export type Message = {
    role: "system" | "user" | "assistant";
    content: Array<{
        type: "text" | "image_url";
        text?: string;
        image_url?: {
            url: string;
        };
    }>;
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages } = body;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages.map((msg: Message) => ({
                role: msg.role,
                content: msg.content[0].text
            })),
            response_format: { type: "text" },
            temperature: 1,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log("OpenAI response:", response);

        return NextResponse.json({
            message: {
                role: "assistant",
                content: response.choices[0].message.content
            }
        });
    } catch (error) {
        console.error('Error in completion:', error);
        return NextResponse.json(
            { error: 'Failed to get completion' },
            { status: 500 }
        );
    }
} 