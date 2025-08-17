
import { genkit, GenerationCommonConfig } from 'genkit';
import { googleAI, GoogleAIGenerativeAIFamily } from '@genkit-ai/googleai';
import { openAI, OpenAIModel } from 'genkitx-openai';
import { apiKeyManager } from './api-key-manager';

export const ai = genkit({
    plugins: [
        googleAI(),
        openAI(),
    ],
    model: 'googleai/gemini-2.0-flash',
});

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

    let maxAttempts = provider === 'googleai' 
        ? (process.env.GEMINI_API_KEYS?.split(',').filter(k => k).length || 1)
        : (process.env.OPENAI_API_KEYS?.split(',').filter(k => k).length || 1);

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const apiKey = provider === 'googleai' 
                ? apiKeyManager.getCurrentGeminiKey() 
                : apiKeyManager.getCurrentOpenAIKey();
            
            if (!apiKey) {
                throw new Error(`No API key available for ${provider}.`);
            }
            
            console.log(`[${provider}] Attempt ${attempt + 1}/${maxAttempts} using key index ${provider === 'googleai' ? apiKeyManager.currentGeminiIndex : apiKeyManager.currentOpenAIIndex}`);

            const result: any = await ai.generate({
                ...options,
                config: {
                    ...options.config,
                    apiKey: apiKey,
                },
            });
            
            return options.output ? result.output! : result;

        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed for ${provider}. Error:`, error instanceof Error ? error.message : String(error));
            
            const switched = provider === 'googleai' 
                ? apiKeyManager.switchToNextGeminiKey() 
                : apiKeyManager.switchToNextOpenAIKey();
            
            if (!switched) {
                console.error(`All API keys for ${provider} have been exhausted.`);
                throw new Error(`All API keys for ${provider} have been exhausted.`);
            }

            if (attempt === maxAttempts - 1) {
                console.error(`Final attempt failed for ${provider}.`);
                throw error;
            }
             console.log(`Switching API key for ${provider} and retrying...`);
        }
    }
    throw new Error(`Failed to generate content after ${maxAttempts} retries for ${provider}.`);
}
