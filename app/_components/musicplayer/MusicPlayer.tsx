import { useEffect, useState } from 'react';
import React from 'react';
import { Play, Pause } from './Symbols';

// Define the type for a file returned from your API
interface S3File {
  key: string;
  url: string;
}

// Define the type for audio instances
interface AudioInstances {
  [key: string]: HTMLAudioElement;
}

export default function MusicPlayer() {
  // State for storing files and audio instances
  const [files, setFiles] = useState<S3File[]>([]);
  const [audioInstances, setAudioInstances] = useState<AudioInstances>({});
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    async function fetchFiles() {
      const response = await fetch('http://localhost:3000/api/s3/getFiles');
      const files: S3File[] = await response.json(); // Type the response as an array of S3File
      console.log("files:", files);
      setFiles(files);

      const audioMap: AudioInstances = {};
      files.forEach(file => {
        console.log('Audio URL:', file.url);
        audioMap[file.key] = new Audio(file.url);
      });
      setAudioInstances(audioMap);
      console.log("audioInstances:", audioInstances);
    }

    fetchFiles();
  }, []);

  const playFile = (fileId: string) => {
    if (!audioInstances[fileId]) return;

    const currentAudio = audioInstances[fileId];

    if (currentTrackId && currentTrackId !== fileId && audioInstances[currentTrackId]) {
      audioInstances[currentTrackId].pause();
      audioInstances[currentTrackId].currentTime = 0;
    }

    if (!isPlaying || currentTrackId !== fileId) {
      currentAudio.play();
      setIsPlaying(true);
      setCurrentTrackId(fileId);
    } else {
      currentAudio.pause();
      setIsPlaying(false);
      setCurrentTrackId(null);
    }
  };

  return (
    <div className="flex flex-row flex-wrap gap-[0.5rem] p-[0.25rem]">
      {files.map(file => (
        <div className="flex flex-row items-center border-[1px] border-black w-fit px-[0.5rem]" key={file.key}>
          <button className="h-[2rem] pr-[0.25rem]" onClick={() => playFile(file.key)}>
            {isPlaying && currentTrackId === file.key ? <Pause /> : <Play />}
          </button>
          <div>
            <p>{file.key.slice(0, -4)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
