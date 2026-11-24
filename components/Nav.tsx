"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./ui";

export default function Nav() {
  const path = usePathname();
  const item = (href: string, label: string) => (
    <Link href={href} className={path === href ? "text-white" : "text-mist hover:text-white"}>{label}</Link>
  );
  return (
    <header className="mb-8 flex items-center justify-between">
      <Link href="/home"><Logo /></Link>
      <nav className="flex gap-5 text-sm font-medium">{item("/home", "Learn")}{item("/dashboard", "Progress")}</nav>
    </header>
  );
}
