import { ReactNode } from "react";

export default function PageContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <main className={`px-16 py-5 gap-3 ${className}`}>{children}</main>;
}
