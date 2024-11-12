import { useAudio } from '../../_context/audioContext';

import React from 'react';
import Player from './Player';

export default function MusicPlayer() {
  const { files, audioInstances, currentTrackId, isPlaying, setIsPlaying, setCurrentTrackId } = useAudio();
  const [nowPlaying, setNowPlaying] = React.useState<string>("");

  const selectForPlayer = (fileId: string) => {
    if (currentTrackId && currentTrackId !== fileId && audioInstances[currentTrackId]) {
      audioInstances[currentTrackId].pause();
      audioInstances[currentTrackId].currentTime = 0;
      setIsPlaying(false);
    }
    setCurrentTrackId(fileId);
    setNowPlaying(fileId);
  };

  return (
    <section className='flex flex-col sm:w-1/2 w-full h-full justify-center items-center mb-[1rem]'>
      <h2 className='sm:hidden mb-[1rem]'>MUSIC</h2>
      <div className="flex flex-col gap-[0.5rem] p-[0.25rem] h-fit	overflow-x-scroll	min-w-[300px] w-fit bg-[#f5f5f5] bg-opacity-80 rounded-sm p-[1rem] border border-solid border-black">
        <section className='flex flex-col justify-center items-center w-full h-fit'>
          <section className='flex flex-col justify-center border border-solid p-2 overflow-x-scroll min-h-[200px] max-h-[200px] bg-[#f5f5f5] bg-opacity-80 w-full border-black border border-solid'>
            {files.map(file => (
              <div className="flex justify-start items-start w-fit p-[0.125rem] h-fit cursor-pointer" key={file.key} onClick={() => selectForPlayer(file.key)} >
                <p className='text-black'>{file.key.slice(0, -4)}</p>
              </div>
            ))}
          </section>
          <Player fileKey={nowPlaying} />
        </section>
      </div>
    </section >
  );
}