import React from "react";


export const Play = () => {
  return (
    <svg className="h-[1.75rem] ml-[7px]" viewBox="0 0 60 60">
      <polygon points="0,0 50,30 0,60" />
    </svg>
  );
};

export const Pause = () => {
  return (
    <svg className="h-[1.75rem] ml-[7px]" viewBox="0 0 60 60">
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  );
};

export const ChooseTrack = () => {
  return (
    <svg className="h-[1.75rem]" viewBox="0 0 60 60">
      <line x1="30" y1="15" x2="30" y2="35" stroke="black" strokeWidth="3" />
      <polygon points="25,30 30,40 35,30" fill="black" />
      <line x1="20" y1="45" x2="40" y2="45" stroke="black" strokeWidth="3" />
    </svg>
  );
};

