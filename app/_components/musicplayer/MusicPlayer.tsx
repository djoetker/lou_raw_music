import { useEffect, useState } from 'react';
import React from 'react';

import { downloadWavFile, getWavFiles } from '../../_api/dropbox/dropbox';
import { Play, Pause } from './Symbols';


type DropboxFile = {
  id: string;
  name: string;
  path_lower: string;
};

export default function MusicPlayer() {
  const [files, setFiles] = useState<DropboxFile[]>([]);
  const [audioInstances, setAudioInstances] = useState<{ [id: string]: HTMLAudioElement }>({});
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function fetchFiles() {
      const wavFiles = await getWavFiles();
      setFiles(wavFiles);
      console.log("wavFiles", wavFiles)

      const audioMap: { [id: string]: HTMLAudioElement } = {};
      console.log("before loop");
      for (const file of wavFiles) {
        const fileUrl = await downloadWavFile(file.path_lower);
        if (fileUrl) {
          audioMap[file.id] = new Audio(fileUrl);
          // finished loading
        }
      }
      setAudioInstances(audioMap);
      console.log("audioMap", audioMap);
    }

    fetchFiles();

    console.log(files);
  }, []);

  const playFile = async (fileId: string) => {
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
    <div className="flex flex-row flex-wrap	gap-[0.5rem] p-[0.25rem]">
      {files.map(file => (
        <div className="flex flex-row items-center border-[1px] border-black w-fit px-[0.5rem]" key={file.id}>
          <button className="h-[2rem] pr-[0.25rem]" onClick={() => playFile(file.id)}>{isPlaying && currentTrackId === file.id ? <Pause /> : <Play />}</button>
          <div>
            <p >{file.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
