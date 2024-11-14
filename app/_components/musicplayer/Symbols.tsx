import React from "react";


export const Play = () => {
  return (
    <svg className="h-[1.75rem] translate-x-1.5" viewBox="0 0 60 60">
      <polygon points="0,0 50,30 0,60" />
    </svg>
  );
};

export const Pause = () => {
  return (
    <svg className="h-[1.75rem] translate-x-[0.3rem] " viewBox="0 0 60 60">
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  );
};

export const NextTrack = () => {
  return (
    <svg className="h-[1.5rem]" viewBox="0 0 60 60">
      <polygon points="0,0 40,30 0,60" />
      <rect x="45" y="0" width="10" height="60" />
    </svg>
  );
};

export const PreviousTrack = () => {
  return (
    <svg className="h-[1.5rem]" viewBox="0 0 60 60">
      <polygon points="60,0 20,30 60,60" />
      <rect x="5" y="0" width="10" height="60" />
    </svg>
  );
};