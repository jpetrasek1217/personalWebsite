export interface EvaluatorRequest {
  videoTitle: string;
  videoLength: string;
  channelSubscribers: number;
  totalChannelViews: number;
  totalVideos: number;
  videoUploadDayofWeek: number;
  videoUploadHour: number;
  channelAgeYears: number;
}

const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL ?? '';

async function compressThumbnailBase64(
  source: File | Blob | string,
  maxSize = 256,
  quality = 0.82,
): Promise<string> {
  const url =
    source instanceof File || source instanceof Blob
      ? URL.createObjectURL(source)
      : source;

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = reject;
    el.src = url;
  });

  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d')!.drawImage(img, 0, 0, w, h);

  if (source instanceof File || source instanceof Blob) URL.revokeObjectURL(url);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error('Canvas toBlob failed'));
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      },
      'image/jpeg',
      quality,
    );
  });
}

export async function predictViews(
  request: EvaluatorRequest,
  thumbnail: File,
): Promise<number> {
  const base64Thumbnail = await compressThumbnailBase64(thumbnail);
  const res = await fetch(`${getApiUrl()}/evaluator/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...request, thumbnail: base64Thumbnail }),
  });
  if (!res.ok) throw new Error('Prediction failed');
  const { prediction } = await res.json();
  return prediction;
}
