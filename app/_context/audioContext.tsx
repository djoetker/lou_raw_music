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
  isLoading: boolean;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export function AudioContextProvider({ children }: AudioContextProviderProps) {
  const [files, setFiles] = useState<S3File[]>([]);
  const [audioInstances, setAudioInstances] = useState<AudioInstances>({});
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    async function fetchFiles() {
      const response = await fetch(`/api/s3/getFiles`);
      const files: S3File[] = await response.json();
      setFiles(files);

      const audioMap: AudioInstances = {};
      files.forEach(file => {
        audioMap[file.key] = new Audio(file.url);
      });
      setAudioInstances(audioMap);
      setIsLoading(false);
    }

    fetchFiles();
  }, []);


  return (
    <AudioContext.Provider value={{ files, audioInstances, currentTrackId, isPlaying, setIsPlaying, setCurrentTrackId, isLoading }} >
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