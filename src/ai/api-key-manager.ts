
class ApiKeyManager {
  private geminiKeys: string[];
  private openaiKeys: string[];
  private currentGeminiIndex = 0;
  private currentOpenAIIndex = 0;

  constructor() {
    this.geminiKeys = (process.env.GEMINI_API_KEYS || '').split(',').filter(k => k.trim());
    this.openaiKeys = (process.env.OPENAI_API_KEYS || '').split(',').filter(k => k.trim());

    if (this.geminiKeys.length === 0) {
      console.warn("No Gemini API keys found in environment variables.");
    }
    if (this.openaiKeys.length === 0) {
      console.warn("No OpenAI API keys found in environment variables.");
    }
  }

  getCurrentGeminiKey(): string | undefined {
    return this.geminiKeys[this.currentGeminiIndex];
  }

  getCurrentOpenAIKey(): string | undefined {
    return this.openaiKeys[this.currentOpenAIIndex];
  }

  switchToNextGeminiKey(): boolean {
    if (this.currentGeminiIndex < this.geminiKeys.length - 1) {
      this.currentGeminiIndex++;
      console.log(`Switched to Gemini API key index ${this.currentGeminiIndex}`);
      return true;
    }
    console.error("All Gemini API keys have been exhausted.");
    return false; // No more keys to switch to
  }

  switchToNextOpenAIKey(): boolean {
    if (this.currentOpenAIIndex < this.openaiKeys.length - 1) {
      this.currentOpenAIIndex++;
      console.log(`Switched to OpenAI API key index ${this.currentOpenAIIndex}`);
      return true;
    }
    console.error("All OpenAI API keys have been exhausted.");
    return false; // No more keys to switch to
  }
}

export const apiKeyManager = new ApiKeyManager();

export async function withApiKeyRotation<T>(
  apiCall: (apiKey: string) => Promise<T>,
  provider: 'googleai' | 'openai'
): Promise<T> {
  let hasSwitched = false;
  while (true) {
    try {
      const apiKey = provider === 'googleai' 
        ? apiKeyManager.getCurrentGeminiKey() 
        : apiKeyManager.getCurrentOpenAIKey();
      
      if (!apiKey) {
        throw new Error(`No API key available for ${provider}.`);
      }

      return await apiCall(apiKey);
    } catch (error) {
      console.error(`API call failed for ${provider}:`, error);
      
      const switched = provider === 'googleai' 
        ? apiKeyManager.switchToNextGeminiKey() 
        : apiKeyManager.switchToNextOpenAIKey();

      if (!switched) {
        throw new Error(`All API keys for ${provider} have been exhausted.`);
      }
      hasSwitched = true;
    }
  }
}
