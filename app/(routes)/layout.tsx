import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../_components/navbar/Navbar";
import P5Background from "../_components/p5/P5Background";
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
            <section className="border-2 border-black min-h-[600px] h-5/6 bg-transparent relative" id="content_container">
              <P5Background />
              <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>

              {children}

            </section>
          </main>
        </AudioContextProvider>
      </body>
    </html>
  );
}
