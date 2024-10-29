import { useAudio } from '../../_context/audioContext';

import React from 'react';
import { Play, Pause } from './Symbols';

export default function MusicPlayer() {
  const { files, audioInstances, currentTrackId, isPlaying, setIsPlaying, setCurrentTrackId } = useAudio();

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
      <div className=''>

      </div>
    </div>
  );
}
