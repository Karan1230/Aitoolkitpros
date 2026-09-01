/**
 * Qwen Image Generation Service
 * Supports Qwen-Image model via ModelScope and DashScope APIs with automatic WebP optimization and intelligent fallback.
 */

const DEFAULT_QWEN_KEY = 'sk-mr-229ee9393b3ada5a5399da81edbb1b050d9240354ad85325daab2f70f5c526de';

export function getQwenApiKey(): string {
  return (
    process.env.QWEN_API_KEY ||
    process.env.MODELSCOPE_API_KEY ||
    process.env.DASHSCOPE_API_KEY ||
    DEFAULT_QWEN_KEY
  ).trim();
}

/**
 * Generate image using Qwen Image AI model (ModelScope / DashScope).
 * Automatically polls asynchronous inference tasks and returns the generated image URL.
 */
export async function generateQwenImage(
  prompt: string,
  options: {
    width?: number;
    height?: number;
    seed?: number;
    model?: string;
  } = {}
): Promise<{ url: string; source: 'qwen' | 'qwen-modelscope' | 'qwen-dashscope' | 'flux-ai' }> {
  const apiKey = getQwenApiKey();
  const width = options.width || 1280;
  const height = options.height || 720;
  const size = `${width}*${height}`;
  const seed = options.seed || Math.floor(Math.random() * 999999);

  // Clean prompt and focus on vivid commercial photography / artwork
  let cleanPrompt = prompt
    .replace(/\b(eye-catching|eye catching|eyeball|artstation|trending on artstation|cyberpunk|deviantart|cartoon|anime|drawing)\b/gi, 'vivid commercial photography')
    .replace(/[^\w\s,.:'"()\-]/g, '')
    .trim();

  if (cleanPrompt.length < 50) {
    cleanPrompt = `Commercial editorial photography of ${cleanPrompt}, 35mm lens, natural studio lighting, ultra-sharp detail, 8k resolution, 16:9 widescreen landscape`;
  }

  // 1. Attempt ModelScope Qwen-Image API
  if (apiKey) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000);

      // ModelScope endpoint
      const response = await fetch('https://api-inference.modelscope.cn/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-ModelScope-Async-Mode': 'true'
        },
        body: JSON.stringify({
          model: options.model || 'Qwen/Qwen-Image',
          prompt: cleanPrompt,
          size: size,
          seed: seed
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();

        // If synchronous output
        if (data.data && Array.isArray(data.data) && data.data[0]?.url) {
          return { url: data.data[0].url, source: 'qwen-modelscope' };
        }
        if (data.output?.results && Array.isArray(data.output.results) && data.output.results[0]?.url) {
          return { url: data.output.results[0].url, source: 'qwen-modelscope' };
        }

        // If asynchronous task returned
        const taskId = data.task_id || data.output?.task_id || data.id;
        if (taskId) {
          const pollStartTime = Date.now();
          while (Date.now() - pollStartTime < 25000) {
            await new Promise(r => setTimeout(r, 2000));
            try {
              const taskRes = await fetch(`https://api-inference.modelscope.cn/v1/tasks/${taskId}`, {
                headers: {
                  'Authorization': `Bearer ${apiKey}`
                }
              });
              if (taskRes.ok) {
                const taskData = await taskRes.json();
                const status = (taskData.task_status || taskData.status || '').toUpperCase();
                
                if (status === 'SUCCEEDED' || status === 'SUCCEED' || status === 'SUCCESS') {
                  const imgUrl =
                    taskData.output_images?.[0] ||
                    taskData.output?.results?.[0]?.url ||
                    taskData.data?.[0]?.url ||
                    taskData.output?.img_urls?.[0];
                  if (imgUrl) {
                    return { url: imgUrl, source: 'qwen-modelscope' };
                  }
                } else if (status === 'FAILED') {
                  break;
                }
              }
            } catch {
              // Retry next poll
            }
          }
        }
      }
    } catch (err) {
      console.warn('[Qwen ModelScope] Request failed or timed out, trying DashScope endpoint...', err);
    }

    // 2. Attempt DashScope Qwen / Wanx endpoint
    try {
      const dsController = new AbortController();
      const dsTimeout = setTimeout(() => dsController.abort(), 20000);

      const dsRes = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-DashScope-Async': 'enable'
        },
        body: JSON.stringify({
          model: 'qwen-image-plus',
          input: {
            prompt: cleanPrompt
          },
          parameters: {
            size: '1280*720',
            seed: seed
          }
        }),
        signal: dsController.signal
      });

      clearTimeout(dsTimeout);

      if (dsRes.ok) {
        const dsData = await dsRes.json();
        const dsTaskId = dsData.output?.task_id;
        if (dsTaskId) {
          const pollStartTime = Date.now();
          while (Date.now() - pollStartTime < 25000) {
            await new Promise(r => setTimeout(r, 2000));
            try {
              const pollRes = await fetch(`https://dashscope.aliyuncs.com/api/v1/tasks/${dsTaskId}`, {
                headers: { 'Authorization': `Bearer ${apiKey}` }
              });
              if (pollRes.ok) {
                const pollData = await pollRes.json();
                const status = (pollData.output?.task_status || '').toUpperCase();
                if (status === 'SUCCEEDED' || status === 'SUCCESS') {
                  const img = pollData.output?.results?.[0]?.url;
                  if (img) {
                    return { url: img, source: 'qwen-dashscope' };
                  }
                } else if (status === 'FAILED') {
                  break;
                }
              }
            } catch {
              // Retry next poll
            }
          }
        }
      }
    } catch (err) {
      console.warn('[Qwen DashScope] Request failed, using FLUX.1 WebP fallback...', err);
    }
  }

  // 3. Ultra-fast FLUX.1 WebP fallback (1280x720 16:9 photorealistic)
  const encoded = encodeURIComponent(cleanPrompt.slice(0, 450));
  const fallbackUrl = `https://image.pollinations.ai/prompt/${encoded}?width=1280&height=720&nologo=true&seed=${seed}&model=flux&format=webp`;

  return {
    url: fallbackUrl,
    source: 'flux-ai'
  };
}
