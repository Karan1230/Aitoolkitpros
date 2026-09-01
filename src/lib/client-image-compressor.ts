/**
 * Client-Side Smart Image Compressor & Optimizer
 * Converts uploaded images to highly compressed WebP format, resizes large dimensions,
 * and strips metadata to maximize Google PageSpeed scores (LCP, CLS, FID) and SEO performance.
 */

export interface CompressionResult {
  dataUrl: string;
  blob: Blob;
  originalSize: number;
  compressedSize: number;
  savedPercentage: number;
  width: number;
  height: number;
  format: string;
}

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default: 0.80)
  targetFormat?: 'image/webp' | 'image/jpeg' | 'image/png';
}

/**
 * Compresses an image File or Blob in the browser using HTML5 Canvas
 */
export async function compressImageFile(
  file: File | Blob,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 1280,
    maxHeight = 720,
    quality = 0.80,
    targetFormat = 'image/webp',
  } = options;

  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaled dimensions while preserving aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const widthRatio = maxWidth / width;
          const heightRatio = maxHeight / height;
          const ratio = Math.min(widthRatio, heightRatio);

          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get 2D canvas context for compression'));
          return;
        }

        // Enable high quality bicubic smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        // Try WebP first, fallback to JPEG if browser doesn't support WebP export
        let format = targetFormat;
        let dataUrl = canvas.toDataURL(format, quality);

        if (!dataUrl.startsWith(`data:${format}`)) {
          format = 'image/jpeg';
          dataUrl = canvas.toDataURL(format, quality);
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to create compressed blob'));
              return;
            }

            const compressedSize = blob.size;
            const savedPercentage = Math.max(
              0,
              Math.round(((originalSize - compressedSize) / originalSize) * 100)
            );

            resolve({
              dataUrl,
              blob,
              originalSize,
              compressedSize,
              savedPercentage,
              width,
              height,
              format,
            });
          },
          format,
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Failed to load image for compression'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Failed to read image file'));
    };
  });
}

/**
 * Optimizes an existing external image URL (like Unsplash) with query parameters for WebP & compression
 */
export function getOptimizedImageUrl(url: string, width = 1200, quality = 75): string {
  if (!url) return '';

  // Unsplash dynamic compression
  if (url.includes('images.unsplash.com')) {
    const base = url.split('?')[0];
    return `${base}?w=${width}&auto=format&fit=crop&q=${quality}&fm=webp`;
  }

  // Pollinations dynamic dimensions
  if (url.includes('image.pollinations.ai') || url.includes('pollinations.ai')) {
    if (!url.includes('width=')) {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}width=${width}&height=${Math.round((width * 9) / 16)}&nologo=true`;
    }
  }

  return url;
}

/**
 * Human readable file size formatter (e.g. 2.4 MB -> 180 KB)
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
