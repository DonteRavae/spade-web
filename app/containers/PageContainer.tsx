import { ReactNode } from "react";

export default function PageContainer({ children }: { children: ReactNode }) {
  return <main className="flex flex-wrap px-28 py-5 gap-3">{children}</main>;
}
