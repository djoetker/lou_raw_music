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
    <div className="flex flex-col gap-[0.5rem] p-[0.25rem] h-full	overflow-x-scroll	min-w-[300px]">
      <section className='flex flex-col justify-center items-center w-full h-fit'>
        <section className='flex flex-col justify-center items-center border-2 border-solid p-2 overflow-x-scroll'>
          {files.map(file => (
            <div className="flex justify-start gap-[1rem] items-center border-[1px] border-black w-fit p-[1rem] h-fit" key={file.key} onClick={() => selectForPlayer(file.key)} >
              <p>{file.key.slice(0, -4)}</p>
            </div>
          ))}
        </section>
        <Player fileKey={nowPlaying} />
      </section>
    </div>
  );
}
