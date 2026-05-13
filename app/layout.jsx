import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Aditya — Portfolio",
  description: "Student and developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen w-full text-white flex flex-col items-center p-10 gap-12">
        <Navbar />
        <main className="max-w-4xl w-full">{children}</main>
      </body>
    </html>
  );
}
