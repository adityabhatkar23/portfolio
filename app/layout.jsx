import Navbar from "../components/Navbar";
import { fontMono, fontSerif } from "../lib/fonts";
import "./globals.css";

export const metadata = {
  title: "Aditya — Portfolio",
  description: "Student and developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fontSerif.variable} ${fontMono.variable}`}>
      <body className="bg-black min-h-screen w-full text-white flex flex-col items-center p-10 gap-12 font-serif antialiased">
        <Navbar />
        <main className="max-w-4xl w-full">{children}</main>
      </body>
    </html>
  );
}
