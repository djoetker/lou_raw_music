import { useAudio } from '../../_context/audioContext';
import Tracklist from './Tracklist';
import Player from './Player';

import React, { useEffect } from 'react';

export default function MusicPlayer() {
  const { files, audioInstances, currentTrackId, isPlaying, setIsPlaying, setCurrentTrackId, isLoading } = useAudio();
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

  useEffect(() => {
    if (currentTrackId) setNowPlaying(currentTrackId);
  }, [currentTrackId]);

  return (
    <section className='flex flex-col sm:w-1/2 w-full h-full justify-center items-center mb-[1rem]'>
      <h2 className='sm:hidden mb-[1rem]'>MUSIC</h2>
      <div className="flex flex-col gap-[0.5rem] p-[0.25rem] h-fit	overflow-x-scroll	min-w-[300px] w-fit bg-[#f5f5f5] bg-opacity-80 rounded-sm p-[1rem] border border-solid border-black">
        <section className='flex flex-col justify-center items-center w-full h-fit'>
          <section className='flex flex-col border border-solid p-2 overflow-x-scroll min-h-[200px] max-h-[200px] bg-[#f5f5f5] bg-opacity-80 w-full border-black border border-solid rounded-sm'>
            <Tracklist files={files} selectForPlayer={selectForPlayer} isLoading={isLoading} />
          </section>
          <Player fileKey={nowPlaying} />
        </section>
      </div>
    </section >
  );
}