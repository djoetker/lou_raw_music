import { useAudio } from '../../_context/audioContext';
import { Play, Pause, NextTrack, PreviousTrack } from './Symbols';
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

  const nextTrack = () => {

    if (files.length === 0) return;
    if (currentTrackId && audioInstances[currentTrackId]) {
      audioInstances[currentTrackId].pause();
      audioInstances[currentTrackId].currentTime = 0;
      const currentTrackIndex = files.findIndex(file => file.key === currentTrackId);
      const nextTrackIndex = (currentTrackIndex + 1) % files.length;
      const nextTrackId = files[nextTrackIndex].key;

      playFile(nextTrackId);
    } else {
      setCurrentTrackId(files[0].key);
    }
  };

  const previousTrack = () => {
    if (files.length === 0) return;
    if (currentTrackId && audioInstances[currentTrackId]) {
      audioInstances[currentTrackId].pause();
      audioInstances[currentTrackId].currentTime = 0;
      const currentTrackIndex = files.findIndex(file => file.key === currentTrackId);
      const previousTrackIndex = (currentTrackIndex - 1 + files.length) % files.length;
      const previousTrackId = files[previousTrackIndex].key;

      playFile(previousTrackId);
    } else {
      setCurrentTrackId(files[0].key);
    };
  };

  if (fileKey === "") {
    return (
      <div className="flex flex-col justify-center items-center min-w-[300px] max-h-[300px] p-2">
        <section>
          <p className='opacity-50 italic h-[3rem] mb-[0.75rem]'>load a track into player</p>
        </section>
        <section className='flex flex-col gap-[0.5rem]'>
          <Timeline nextTrack={nextTrack} />
        </section>
        <section className='flex flex-row justify-center items-center min-w-[300px] max-h-[300px] p-2'>
          <button className="flex justify-center items-center left-8 h-fit border-[1px] transition-colors duration-300 border-black hover:bg-slate-100 border-solid rounded-full p-3 mx-[0.5rem] active:shadow-btncl " onClick={previousTrack}>
            <PreviousTrack />
          </button>
          <button className="flex justify-center items-center left-8 h-fit border-[1px] transition-colors duration-300 border-black hover:bg-slate-100 border-solid rounded-full p-4 mx-[0.5rem] active:shadow-btncl " onClick={() => playFile(fileKey)}>
            {isPlaying && currentTrackId === fileKey ? <Pause /> : <Play />}
          </button>
          <button className="flex justify-center items-center left-8 h-fit border-[1px] transition-colors duration-300 border-black hover:bg-slate-100 border-solid rounded-full p-3 mx-[0.5rem] active:shadow-btncl " onClick={nextTrack}>
            <NextTrack />
          </button>
        </section>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col justify-center items-center min-w-[300px] max-h-[300px] p-2">
        <section className='w-full h-[3rem]'>
          <p className="font-hairline">{fileKey?.slice(0, -4)}</p>
          <p className='font-hairline text-[0.7rem] mb-[0.75rem]'>LOU RAW</p>
        </section>
        <section className='flex flex-col gap-[0.5rem]'>
          <Timeline nextTrack={nextTrack} />
        </section>
        <section className='flex flex-row justify-center items-center min-w-[300px] max-h-[300px] p-2'>
          <button className="flex justify-center items-center left-8 h-fit border-[1px] transition-colors duration-300 hover:bg-slate-100 border-black border-solid rounded-full p-4 mx-[0.5rem] active:shadow-btncl " onClick={previousTrack}>
            <PreviousTrack />
          </button>
          <button className="flex justify-center items-center left-8 h-fit border-[1px] transition-colors duration-300 hover:bg-slate-100 border-black border-solid rounded-full p-4 mx-[0.5rem] active:shadow-btncl " onClick={() => playFile(fileKey)}>
            {isPlaying && currentTrackId === fileKey ? <Pause /> : <Play />}
          </button>
          <button className="flex justify-center items-center left-8 h-fit border-[1px] transition-colors duration-300 hover:bg-slate-100 border-black border-solid rounded-full p-4 mx-[0.5rem] active:shadow-btncl  " onClick={nextTrack}>
            <NextTrack />
          </button>
        </section>
      </div>
    )
  }
};