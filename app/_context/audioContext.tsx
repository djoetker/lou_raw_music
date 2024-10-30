"use client";

import { createContext, useContext, useState, useEffect } from 'react';

type AudioContextProviderProps = {
  children: React.ReactNode;
};

interface S3File {
  key: string;
  url: string;
}
interface AudioInstances {
  [key: string]: HTMLAudioElement;
}

interface AudioContextValue {
  files: S3File[];
  audioInstances: AudioInstances;
  currentTrackId: string | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrackId: (trackId: string | null) => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export function AudioContextProvider({ children }: AudioContextProviderProps) {
  const [files, setFiles] = useState<S3File[]>([]);
  const [audioInstances, setAudioInstances] = useState<AudioInstances>({});
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);


  useEffect(() => {
    async function fetchFiles() {
      const response = await fetch(`${process.env.API_URL}/api/s3/getFiles`);
      const files: S3File[] = await response.json();
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


  return (
    <AudioContext.Provider value={{ files, audioInstances, currentTrackId, isPlaying, setIsPlaying, setCurrentTrackId }} >
      {children}
    </AudioContext.Provider>
  )
};


export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioContextProvider");
  }
  return context;
};