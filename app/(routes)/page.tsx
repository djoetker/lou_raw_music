import socialsList from "../api/other/socialsList.js"


export default function Home() {


  return (
    <section className="flex flex-row flex-wrap w-full h-full justify-around">
      {Object.entries(socialsList).map(([section, links], index) => (
        <div key={index} className="flex flex-col flex-wrap items-center mb-4 min-w-[400px] h-fit mt-[4rem]">
          <h2 className="text-3xl font-semibold mb-2">{section}</h2>
          <div className="">
            {Object.entries(links).map(([platform, url], idx) => (
              <div key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="block text-black border border-solid border-black rounded-sm hover:bg-slate-100 py-[0.75rem] px-[1.5rem] my-[1rem] text-center min-w-[400px]	">
                  {platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
