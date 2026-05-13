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
    <nav className="border border-border shadow-sm shadow-black/30 flex items-center justify-between bg-card px-3 font-semibold min-w-56 py-1 rounded-none font-jetbrains-mono tracking-tighter text-nav-foreground">
      <Link href="/" className={navClass(pathname, "/", true)}>
        Home
      </Link>
      <Link href="/projects" className={navClass(pathname, "/projects", false)}>
        Projects
      </Link>
      <Link href="/contact" className={navClass(pathname, "/contact", false)}>
        Contact
      </Link>
      <Link href="/blog" className={navClass(pathname, "/blog", false)}>
        Blog
      </Link>
    </nav>
  );
}
