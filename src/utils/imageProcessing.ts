/**
 * Image processing utilities for seamless background removal and integration
 */

export interface ProcessImageOptions {
  threshold?: number; // Brightness threshold (0-255) above which pixels are considered white
  feather?: number;   // Feathering range for smooth antialiasing
}

/**
 * Removes pure or near-white background from an image using an offscreen HTML5 canvas,
 * returning a transparent PNG data URL.
 */
export function removeWhiteBackground(
  imageSrc: string,
  options: ProcessImageOptions = {}
): Promise<string> {
  const { threshold = 225, feather = 30 } = options;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          return resolve(imageSrc);
        }

        ctx.drawImage(img, 0, 0);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Check corner pixels to determine if background is predominantly white
        const corners = [
          0, // top-left
          (canvas.width - 1) * 4, // top-right
          ((canvas.height - 1) * canvas.width) * 4, // bottom-left
          ((canvas.height - 1) * canvas.width + (canvas.width - 1)) * 4, // bottom-right
        ];

        let whiteCorners = 0;
        for (const idx of corners) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          if (r > 210 && g > 210 && b > 210) {
            whiteCorners++;
          }
        }

        // Only process if corners indicate a white/light background
        const isWhiteBg = whiteCorners >= 2;

        if (isWhiteBg) {
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];

            // Color neutrality check (white/gray has low difference between channels)
            const maxDiff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
            const brightness = (r + g + b) / 3;

            // If it's bright and neutral (not a vibrant color)
            if (brightness > threshold - feather && maxDiff < 35) {
              if (brightness >= threshold) {
                data[i + 3] = 0; // 100% transparent
              } else {
                // Smooth edge feathering
                const alphaFactor = (threshold - brightness) / feather;
                data[i + 3] = Math.round(data[i + 3] * Math.max(0, Math.min(1, alphaFactor)));
              }
            }
          }

          ctx.putImageData(imgData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          // If not a white background, return original
          resolve(imageSrc);
        }
      } catch (err) {
        console.warn('Canvas background removal error (likely CORS):', err);
        resolve(imageSrc);
      }
    };

    img.onerror = () => {
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
}

/**
 * Reads a File object from input or drag-and-drop into a data URL
 */
export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to data URL'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
