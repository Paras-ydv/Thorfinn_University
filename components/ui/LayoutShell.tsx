"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AIChatbot } from "./AIChatbot";

const NO_SHELL_ROUTES = ["/dashboard", "/login", "/signup"];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = NO_SHELL_ROUTES.some((r) => pathname.startsWith(r));

  if (hideShell) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <AIChatbot />
    </>
  );
}
