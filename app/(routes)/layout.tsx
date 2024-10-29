import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../_components/navbar/Navbar";
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
        className="max-w-screen-xl mx-auto"
      >
        <AudioContextProvider>
          <Navbar />
          <main className="max-w-screen-xl min-h-550 h-screen max-h-800">
            <section className="border-2 border-black min-h-[600px] h-5/6 h-fit">

              {children}

            </section>
          </main>
        </AudioContextProvider>
      </body>
    </html>
  );
}
