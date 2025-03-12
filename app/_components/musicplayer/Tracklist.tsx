import TracklistLoading from "./_loading/TracklistLoading";

import React from "react";

export default function Tracklist({ files, selectForPlayer, isLoading }: { files: any[]; selectForPlayer: (fileId: string) => void; isLoading: boolean }) {

  if (isLoading) {
    return (
      <TracklistLoading />
    );
  } else {
    return (
      <div className='h-fit rounded-sm'>
        {files.map(file => (
          <div className="flex justify-start items-start w-fit p-[0.125rem] h-fit cursor-pointer rounded-sm" key={file.key} onClick={() => selectForPlayer(file.key)} >
            <p className='text-black'>{file.key.slice(0, -4)}</p>
          </div>
        ))}
      </div>
    );
  };
};
