import { useAudio } from '../../_context/audioContext';
import { Play, Pause } from './Symbols';
import Timeline from './Timeline';


export default function Player({ fileKey }: Readonly<{ fileKey: string }>) {
  const { files, audioInstances, currentTrackId, isPlaying, setIsPlaying, setCurrentTrackId } = useAudio();

  const playFile = (fileId: string) => {
    if (!audioInstances[fileId]) return;

    const currentAudio = audioInstances[fileId];

    if (!isPlaying || currentTrackId !== fileId) {
      currentAudio.play();
      setIsPlaying(true);
      setCurrentTrackId(fileId);
    } else {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  if (fileKey === "") {
    return (
      <div className="flex flex-col justify-center items-center min-w-[300px] max-h-[300px] p-2">

        <section>
          <p className='opacity-50 italic h-[3rem] mb-[0.75rem]'>load a track into player</p>
        </section>
        <section className='flex flex-col gap-[0.5rem]'>
          <Timeline />
        </section>
        <button className="flex justify-center items-center left-8 h-fit border-[2px] border-solid rounded-full p-4 " onClick={() => playFile(fileKey)}>
          {isPlaying && currentTrackId === fileKey ? <Pause /> : <Play />}
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-center items-center min-w-[300px] max-h-[300px] p-2">
        <section className='w-full'>
          <p className="font-hairline">{fileKey.slice(0, -4)}</p>
          <p className='font-hairline text-[0.7rem] mb-[0.75rem]'>LOU RAW</p>
        </section>
        <section className='flex flex-col gap-[0.5rem]'>
          <Timeline />
        </section>
        <button className="flex justify-center items-center left-8 h-fit border-[2px] border-solid rounded-full p-4 " onClick={() => playFile(fileKey)}>
          {isPlaying && currentTrackId === fileKey ? <Pause /> : <Play />}
        </button>
      </div>
    )
  }
};