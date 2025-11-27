import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-[1%] pt-12">{children}</main>
    </div>
  );
}