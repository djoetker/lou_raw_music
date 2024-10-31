import { useAudio } from '../../_context/audioContext';

import { useEffect, useState } from 'react';


export default function Timeline() {
  const { files, audioInstances, currentTrackId, isPlaying, setIsPlaying } = useAudio();
  const [currentTime, setCurrentTime] = useState<number>(0);


  useEffect(() => {
    if (currentTrackId && isPlaying) {
      const interval = setInterval(() => {
        const time = audioInstances[currentTrackId]?.currentTime || 0;
        setCurrentTime(time);
        if (time >= audioInstances[currentTrackId].duration) {
          setCurrentTime(0);
          audioInstances[currentTrackId].currentTime = 0;
          setIsPlaying(false);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentTrackId, isPlaying, audioInstances]);

  const getFormattedDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (currentTrackId && audioInstances[currentTrackId]) {
      audioInstances[currentTrackId].currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <>
      <section className='flex items-center min-w[300px] '>
        <input
          className='h-[0.25rem] w-[100%] bg-gray-300'
          type="range"
          name='timeline'
          min="0"
          max={currentTrackId ? (audioInstances[currentTrackId].duration) : 0}
          value={currentTrackId ? (audioInstances[currentTrackId].currentTime) : 0}
          onChange={handleSeek}
        />
      </section>
      <section className="flex justify-between">
        <p className='text-[0.75rem]'>
          {currentTrackId ? getFormattedDuration(audioInstances[currentTrackId].currentTime) : "0:00"}
        </p>
        <p className='text-[0.75rem]'>
          {currentTrackId ? (getFormattedDuration(audioInstances[currentTrackId].duration)) : "-:--"}
        </p>
      </section>
    </>
  )
}