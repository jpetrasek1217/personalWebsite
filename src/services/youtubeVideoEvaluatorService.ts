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

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result?.toString().split(',')[1];
      if (base64) resolve(base64);
      else reject(new Error('Failed to read thumbnail'));
    };
    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsDataURL(file);
  });
}

export async function predictViews(
  request: EvaluatorRequest,
  thumbnail: File
): Promise<number> {
  const base64Thumbnail = await readFileAsBase64(thumbnail);
  const res = await fetch(`${getApiUrl()}/evaluator/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...request, thumbnail: base64Thumbnail }),
  });
  if (!res.ok) throw new Error('Prediction failed');
  const { prediction } = await res.json();
  return prediction;
}
