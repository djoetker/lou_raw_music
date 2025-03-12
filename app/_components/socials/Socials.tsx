import socialsList from "../../api/other/socialsList.js";
import { cleanUnderscore } from "../../api/other/cleanUnderscore.js";

export default function Socials() {

  return (

    <section className="flex flex-col sm:w-1/2 w-full h-full justify-center items-center ">
      {Object.entries(socialsList).map(([section, links], index) => (
        <div key={index} className="flex flex-col flex-wrap items-center justify-center mb-1 w-5/6 max-w-[350px] h-fit mt-[1rem]">

          {Object.entries(links).map(([platform, url], idx) => (
            <div key={idx} className="relative w-full rounded-sm">
              <span className="absolute top-0 left-0.5 text-[0.6rem]">{section}</span>
              <a href={url} target="_blank" rel="noopener noreferrer" className="block bg-[#f5f5f5] bg-opacity-70 text-black border border-solid border-black rounded-sm hover:bg-slate-100 py-[0.75rem] px-[1.5rem] mb-[1rem] text-center w-full max-w-[400px]	">
                {cleanUnderscore(platform)}
              </a>
            </div>
          ))}

        </div>
      ))}
    </section>

  )
}