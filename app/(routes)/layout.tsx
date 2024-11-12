import type { Metadata } from "next";
import dynamic from "next/dynamic";

import "./globals.css";
import Navbar from "../_components/navbar/Navbar";
const P5Background = dynamic(() => import("../_components/p5/P5Background"), {
  ssr: false,
});
import { AudioContextProvider } from "../_context/audioContext";

export const metadata: Metadata = {
  title: "raw-music",
  description: "website for lou raw",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="max-w-screen-xl mx-auto px-[0.25rem] md:px-0"
      >
        <AudioContextProvider>
          <Navbar />
          <main className="max-w-screen-xl min-h-550 h-fit">
            <section className="flex flex-col sm:flex-row flex-wrap items-center justifiy-center border-2 border-black h-5/6 min-h-[600px] bg-transparent relative w-full" id="content_container">
              <P5Background />

              {children}

            </section>
          </main>
        </AudioContextProvider>
      </body>
    </html>
  );
}
