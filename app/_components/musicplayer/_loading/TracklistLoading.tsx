export default function TracklistLoading() {

  const widthArray = ["w-5/6", "w-1/4", "w-3/4", "w-4/5", "w-3/5", "w-3/6", "w-11/12", "w-5/6"];

  const buildSkeleton = () => {
    const skeletonArray = [];

    for (let i = 0; i < 10; i++) {
      skeletonArray.push(<div className={`h-4 bg-slate-300 rounded ${widthArray[Math.floor(Math.random() * widthArray.length)]}`}></div>)
    };

    return skeletonArray;
  };

  return (
    <div className="animate-pulse flex flex-col justify-start items-start gap-2">
      {buildSkeleton()}

      {/* <div className="h-4 bg-slate-300 rounded "></div> */}


    </div>
  );
};