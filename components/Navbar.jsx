"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function navClass(pathname, href, end) {
  const active = end
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
  return active ? "active nav" : "nav";
}

export default function Navbar() {
  const pathname = usePathname() || "/";

  return (
    <nav className="shadow-2xs shadow-neutral-800 flex items-center justify-between bg-neutral-950 px-3 font-semibold min-w-56 py-1 rounded-xl font-jetbrains-mono tracking-tighter">
      <Link href="/" className={navClass(pathname, "/", true)}>
        Home
      </Link>
      <Link href="/projects" className={navClass(pathname, "/projects", false)}>
        Projects
      </Link>
      <Link href="/contact" className={navClass(pathname, "/contact", false)}>
        Contact
      </Link>
    </nav>
  );
}
