'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Container from '@/components/layout/Container';
import ThumbnailDropzone from '@/components/youtube-video-evaluator/ThumbnailDropzone';
import { predictViews, EvaluatorRequest } from '@/services/youtubeVideoEvaluatorService';

type FormInputs = EvaluatorRequest & { thumbnailFileInput: File[] };

function isValidVideoLength(value: string): true | string {
  const parts = value.split(':').map(Number);
  if (parts.some(isNaN)) return 'Invalid time format';
  let days = 0, hours = 0, minutes = 0, seconds = 0;
  if (parts.length === 2) [minutes, seconds] = parts;
  else if (parts.length === 3) [hours, minutes, seconds] = parts;
  else if (parts.length === 4) [days, hours, minutes, seconds] = parts;
  else return 'Format must be MM:SS, HH:MM:SS, or DD:HH:MM:SS';
  if (seconds >= 60) return 'Seconds must be less than 60';
  if (minutes >= 60) return 'Minutes must be less than 60';
  if (hours >= 24) return 'Hours must be less than 24';
  if (days >= 99) return 'Days must be less than 99';
  return true;
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-dark/20 font-body bg-white/70 backdrop-blur-sm focus:outline-none focus:border-accent transition-colors';
const labelClass = 'block font-header font-black text-caption text-dark/70 mb-1';
const errorClass = 'text-red-500 font-body text-caption mt-1';

export default function YouTubeVideoEvaluator() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState('');

  const { control, register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    setError('');
    setPrediction(null);
    try {
      const { thumbnailFileInput, ...request } = data;
      const result = await predictViews(request, thumbnailFileInput[0]);
      setPrediction(result);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-12 max-w-2xl">
      <h1 className="font-header font-black text-h1 mb-2">YouTube Video Evaluator</h1>
      <p className="font-body text-caption text-dark/60 mb-8">
        Enter your video details to get an AI-powered view count prediction.
      </p>

      {prediction !== null && (
        <div className="rounded-xl bg-accent/10 border border-accent/30 px-6 py-5 mb-8">
          <p className="font-body text-caption text-dark/60 mb-1">Estimated views</p>
          <p className="font-header font-black text-h2 text-dark">
            {(10 ** prediction).toLocaleString('en')}
            {' – '}
            {(10 ** (prediction + 1)).toLocaleString('en')}
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 font-body text-caption mb-6">❌ {error}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className={labelClass}>Thumbnail</label>
          <Controller
            name="thumbnailFileInput"
            control={control}
            defaultValue={[]}
            rules={{ validate: (files) => files.length === 1 || 'A thumbnail image is required' }}
            render={({ field }) => (
              <ThumbnailDropzone value={field.value} onChange={field.onChange} />
            )}
          />
          {errors.thumbnailFileInput && (
            <p className={errorClass}>{errors.thumbnailFileInput.message}</p>
          )}
        </div>

        <div>
          <label className={labelClass}>Video Title</label>
          <input
            type="text"
            placeholder="Enter your video title"
            className={inputClass}
            {...register('videoTitle', { required: 'Video title is required' })}
          />
          {errors.videoTitle && <p className={errorClass}>{errors.videoTitle.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Video Length (MM:SS or HH:MM:SS or DD:HH:MM:SS)</label>
          <input
            type="text"
            placeholder="10:30"
            defaultValue="10:10"
            className={inputClass}
            {...register('videoLength', {
              required: 'Video length is required',
              validate: isValidVideoLength,
            })}
          />
          {errors.videoLength && <p className={errorClass}>{errors.videoLength.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Channel Subscribers</label>
            <input type="number" placeholder="0" className={inputClass}
              {...register('channelSubscribers', {
                required: 'Required', valueAsNumber: true,
                min: { value: 0, message: 'Must be ≥ 0' },
              })} />
            {errors.channelSubscribers && <p className={errorClass}>{errors.channelSubscribers.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Total Channel Views</label>
            <input type="number" placeholder="0" className={inputClass}
              {...register('totalChannelViews', {
                required: 'Required', valueAsNumber: true,
                min: { value: 0, message: 'Must be ≥ 0' },
              })} />
            {errors.totalChannelViews && <p className={errorClass}>{errors.totalChannelViews.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Total Videos</label>
            <input type="number" placeholder="0" className={inputClass}
              {...register('totalVideos', {
                required: 'Required', valueAsNumber: true,
                min: { value: 0, message: 'Must be ≥ 0' },
              })} />
            {errors.totalVideos && <p className={errorClass}>{errors.totalVideos.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Upload Day of Week (0–6)</label>
            <input type="number" placeholder="0" className={inputClass}
              {...register('videoUploadDayofWeek', {
                required: 'Required', valueAsNumber: true,
                min: { value: 0, message: '0 = Sun, 6 = Sat' },
                max: { value: 6, message: '0 = Sun, 6 = Sat' },
              })} />
            {errors.videoUploadDayofWeek && <p className={errorClass}>{errors.videoUploadDayofWeek.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Upload Hour (0–23)</label>
            <input type="number" placeholder="12" className={inputClass}
              {...register('videoUploadHour', {
                required: 'Required', valueAsNumber: true,
                min: { value: 0, message: '0–23' },
                max: { value: 23, message: '0–23' },
              })} />
            {errors.videoUploadHour && <p className={errorClass}>{errors.videoUploadHour.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Channel Age (Years)</label>
            <input type="number" placeholder="0" className={inputClass}
              {...register('channelAgeYears', {
                required: 'Required', valueAsNumber: true,
                min: { value: 0, message: 'Must be ≥ 0' },
              })} />
            {errors.channelAgeYears && <p className={errorClass}>{errors.channelAgeYears.message}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-accent text-dark font-header font-black rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? 'Analyzing…' : 'Get Prediction'}
        </button>
      </form>
    </Container>
  );
}
