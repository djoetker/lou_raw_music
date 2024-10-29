import { useAudio } from '../../_context/audioContext';

import React from 'react';
import { Play, Pause } from './Symbols';
import Player from './Player';

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
    <div className="flex flex-col flex-wrap gap-[0.5rem] p-[0.25rem] h-full">
      <section className='flex flex-row flex-wrap gap-[1.5rem] justify-items-auto place-content-start p-[0.25rem] h-4/5'>
        {files.map(file => (
          <div className="flex flex-row items-center border-[1px] border-black w-fit px-[1.5rem] h-fit" key={file.key}>
            <button className="h-[2rem] pr-[0.25rem]" onClick={() => playFile(file.key)}>
              {isPlaying && currentTrackId === file.key ? <Pause /> : <Play />}
            </button>
            <div>
              <p>{file.key.slice(0, -4)}</p>
            </div>
          </div>
        ))}
      </section>
      <section className='flex flex-row justify-center items-center w-full '>
        <Player />
      </section>
    </div>
  );
}
