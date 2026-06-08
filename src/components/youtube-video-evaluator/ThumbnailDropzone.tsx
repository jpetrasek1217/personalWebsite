'use client';

import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

type ThumbnailDropzoneProps = {
  value?: File[];
  onChange?: (files: File[]) => void;
};

export default function ThumbnailDropzone({ value = [], onChange }: ThumbnailDropzoneProps) {
  const [files, setFiles] = useState<File[]>(value);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setFiles(value);
    if (value.length > 0) {
      const url = URL.createObjectURL(value[0]);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    multiple: false,
    onDrop: (accepted) => {
      setFiles(accepted);
      onChange?.(accepted);
      if (accepted.length > 0) {
        const url = URL.createObjectURL(accepted[0]);
        setPreview(url);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center font-body transition-colors ${
        isDragActive
          ? 'border-accent bg-accent/10'
          : 'border-dark/20 bg-white/70 backdrop-blur-sm hover:border-accent/50'
      }`}>
      <input {...getInputProps()} />
      {files.length > 0 && preview ? (
        <>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-dark/5 mb-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt={files[0].name}
              className="w-full h-full object-contain"
            />
          </div>
          <p className="font-black text-body text-dark truncate">{files[0].name}</p>
          <p className="text-caption text-dark/50 mt-1">
            {(files[0].size / 1024 / 1024).toFixed(2)} MB
          </p>
          <p className="text-caption text-dark/40 mt-2">Click or drag to replace</p>
        </>
      ) : isDragActive ? (
        <>
          <p className="text-4xl mb-2">📸</p>
          <p className="font-black text-body text-accent">Drop your thumbnail here!</p>
        </>
      ) : (
        <>
          <p className="text-4xl mb-2">📸</p>
          <p className="font-black text-body text-dark">Drag & drop your thumbnail</p>
          <p className="text-caption text-dark/50 mt-1">or click to select a file</p>
          <p className="text-caption text-dark/40 mt-2">JPG, PNG or GIF</p>
        </>
      )}
    </div>
  );
}
