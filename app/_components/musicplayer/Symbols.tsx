import React from "react";


export const Play = () => {
  return (
    <svg className="h-[1.25rem]" viewBox="0 0 60 60">
      <polygon points="0,0 50,30 0,60" />
    </svg>
  );
};

export const Pause = () => {
  return (
    <svg className="h-[1.25rem]" viewBox="0 0 60 60">
      <polygon points="0,0 15,0 15,60 0,60" />
      <polygon points="25,0 40,0 40,60 25,60" />
    </svg>
  );
};

