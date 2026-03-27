import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DEPARTMENTS } from "@/lib/data";
import { DepartmentDetail } from "./DepartmentDetail";

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return DEPARTMENTS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dept = DEPARTMENTS.find((d) => d.slug === params.slug);
  return { title: dept?.name ?? "Department" };
}

export default function Page({ params }: Props) {
  const dept = DEPARTMENTS.find((d) => d.slug === params.slug);
  if (!dept) notFound();
  return <DepartmentDetail dept={dept} />;
}
