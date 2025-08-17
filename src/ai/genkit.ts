import { genkit, GenerationCommonConfig } from 'genkit';
import { googleAI, GoogleAIGenerativeAIFamily } from '@genkit-ai/googleai';
import { openAI, OpenAIModel } from 'genkitx-openai';
import { apiKeyManager } from './api-key-manager';

// This function dynamically creates a plugin configuration with the current API key.
const getGoogleAIPlugin = () => {
    const apiKey = apiKeyManager.getCurrentGeminiKey();
    return googleAI({ apiKey });
};

const getOpenAIPlugin = () => {
    const apiKey = apiKeyManager.getCurrentOpenAIKey();
    return openAI({ apiKey });
};

// Main AI configuration
export const ai = genkit({
    plugins: [
        getGoogleAIPlugin(),
        getOpenAIPlugin(),
    ],
    model: 'googleai/gemini-2.0-flash',
});

// A helper function to re-initialize genkit with the next key if the current one fails
const reconfigureGenkit = (provider: 'googleai' | 'openai') => {
    if (provider === 'googleai') {
        apiKeyManager.switchToNextGeminiKey();
    } else {
        apiKeyManager.switchToNextOpenAIKey();
    }
    ai.configure({
        plugins: [
            getGoogleAIPlugin(),
            getOpenAIPlugin(),
        ],
        model: 'googleai/gemini-2.0-flash',
    });
};

// Generic generate function with retry logic
export async function generateWithRetry<T>(
    options: {
        model: GoogleAIGenerativeAIFamily | OpenAIModel;
        prompt: any;
        config?: GenerationCommonConfig;
        output?: any;
    }
): Promise<T> {
    const provider = options.model.toString().startsWith('googleai') ? 'googleai' : 'openai';

    let attempts = provider === 'googleai' 
        ? (process.env.GEMINI_API_KEYS?.split(',').length || 1)
        : (process.env.OPENAI_API_KEYS?.split(',').length || 1);

    while (attempts > 0) {
        try {
            const result: any = await ai.generate(options);
            return options.output ? result.output! : result;
        } catch (error) {
            console.error(`Attempt failed for ${provider}. Error:`, error);
            attempts--;
            if (attempts > 0) {
                console.log(`Switching API key for ${provider} and retrying...`);
                reconfigureGenkit(provider);
            } else {
                console.error(`All API keys for ${provider} have failed.`);
                throw error;
            }
        }
    }
    throw new Error(`Failed to generate content after multiple retries for ${provider}.`);
}
