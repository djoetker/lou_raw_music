"use client";

import { useAudio } from '../../_context/audioContext';

import Link from "next/link"

export default function Navbar() {
  const { audioInstances, currentTrackId, setIsPlaying } = useAudio();

  const stopMusic = () => {
    if (currentTrackId && audioInstances[currentTrackId]) {
      audioInstances[currentTrackId].pause();
      audioInstances[currentTrackId].currentTime = 0;
      setIsPlaying(false);
    }
  }

  return (
    <header className="flex items-end justify-between p-0 text-black pt-3">
      <h1 className="text-2xl font-bold">LOU RAW</h1>
      <nav>
        <ul className="flex space-x-4">
          <Link href="/" onClick={() => stopMusic()}>
            <p>HOME</p>
          </Link>
          {/* <Link href="/music" onClick={() => stopMusic()}>
            <p>MUSIC</p>
          </Link> */}
        </ul>
      </nav>
    </header>
  )
}