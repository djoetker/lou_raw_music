import socialsList from "../../api/other/socialsList.js";

export default function Socials() {

  return (

    <section className="flex flex-col w-1/2 h-full justify-around">
      {Object.entries(socialsList).map(([section, links], index) => (
        <div key={index} className="flex flex-col flex-wrap items-center mb-1 min-w-[400px] h-fit mt-[1rem]">
          <h2 className="text-2xl font-semibold mb-1">{section}</h2>
          <div className="">
            {Object.entries(links).map(([platform, url], idx) => (
              <div key={idx}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-white text-black border border-solid border-black rounded-sm hover:bg-slate-100 py-[0.75rem] px-[1.5rem] my-[1rem] text-center min-w-[400px]	">
                  {platform}
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>

  )
}