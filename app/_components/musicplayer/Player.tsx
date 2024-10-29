import { useAudio } from '../../_context/audioContext';

import { Play, Pause } from './Symbols';


export default function Player({ fileKey }: Readonly<{ fileKey: string }>) {
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

  if (fileKey === "") {
    return (
      <div className="flex flex-col justify-center items-center border-2 border-solid p-2">
        <section><p className='opacity-50 italic'>load a track into player</p></section>
        <button className="flex justify-center items-center left-8 h-fit border-[2px] border-solid rounded-full p-4 " onClick={() => playFile(fileKey)}>
          {isPlaying && currentTrackId === fileKey ? <Pause /> : <Play />}
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-center items-center border-2 border-solid p-2">
        <section>{fileKey.slice(0, -4)}</section>
        <button className="flex justify-center items-center left-8 h-fit border-[2px] border-solid rounded-full p-4 " onClick={() => playFile(fileKey)}>
          {isPlaying && currentTrackId === fileKey ? <Pause /> : <Play />}
        </button>
      </div>
    )
  }
}