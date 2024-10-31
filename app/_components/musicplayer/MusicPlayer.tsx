import { useAudio } from '../../_context/audioContext';
import { ChooseTrack } from './Symbols';


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
    <div className="flex flex-col flex-wrap gap-[0.5rem] p-[0.25rem] h-full">
      <section className='flex flex-row justify-center items-center w-full h-fit'>
        <Player fileKey={nowPlaying} />
      </section>
      <section className='flex flex-row flex-wrap gap-[0.5rem] justify-between place-content-start p-[0.25rem] h-4/5 overflow-hidden overflow-y-scroll'>
        {files.map(file => (
          <div className="flex justify-start gap-[1rem] items-center border-[1px] border-black w-fit p-[1rem] h-fit" key={file.key}  >
            <button className='border-[1px] border-black shadow-xl active:shadow-none active:shadow-inner' title='load track to player' onClick={() => selectForPlayer(file.key)}>
              <ChooseTrack />
            </button>
            <div>
              <p>{file.key.slice(0, -4)}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
