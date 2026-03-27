import type { Metadata } from "next";
import { AboutPage } from "./AboutPage";

export const metadata: Metadata = { title: "About" };
export default function Page() { return <AboutPage />; }
