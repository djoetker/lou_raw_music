import TracklistLoading from "./_loading/TracklistLoading";
import { cleanUnderscore } from "../../api/other/cleanUnderscore.js";
import { useAudio } from '../../_context/audioContext';

import React from "react";

export default function Tracklist({ files, selectForPlayer, isLoading }: { files: any[]; selectForPlayer: (fileId: string) => void; isLoading: boolean }) {
  const { currentTrackId } = useAudio();

  if (isLoading) {
    return (
      <TracklistLoading />
    );
  } else {
    return (
      <div className="h-fit rounded-sm">
        {files.map((file, index) => {
          const isSelected = file.key === currentTrackId;
          return (
            <div
              key={index}
              onClick={() => selectForPlayer(file.key)}
              className={`flex justify-start items-start w-100 p-[0.125rem] h-fit cursor-pointer transition-colors duration-200
                ${isSelected ? "bg-black text-white" : index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              `}
            >
              <p>{cleanUnderscore(file.key.slice(0, -4))}</p>
            </div>
          );
        })}
      </div>
    );
  };
};
