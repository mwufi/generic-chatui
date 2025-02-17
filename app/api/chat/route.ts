import { openai, type OpenAIProvider } from '@ai-sdk/openai';
import { anthropic, type AnthropicProvider } from '@ai-sdk/anthropic';
import { deepseek, type DeepSeekProvider } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, config } = await req.json();
    const model = config?.model || 'gpt-4o';

    console.log("Messages:", messages);
    console.log("Model:", model);

    // Map of model prefixes to their respective clients
    const modelClients: Record<string, OpenAIProvider | AnthropicProvider | DeepSeekProvider> = {
        'claude': anthropic,
        'gpt': openai,
        'o1': openai,
        'o3': openai,
        'deepseek': deepseek
    };

    // Determine which client to use based on model prefix
    const clientKey = Object.keys(modelClients).find(prefix => model.startsWith(prefix));
    if (!clientKey) {
        throw new Error(`Unsupported model: ${model}`);
    }

    const result = streamText({
        model: modelClients[clientKey](model),
        messages,
    });

    return result.toDataStreamResponse({
        sendReasoning: model.startsWith('deepseek') || model.startsWith('o3') || model.startsWith('o1'),
    });
}