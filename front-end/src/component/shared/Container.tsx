import { ReactNode } from "react";
import { Layout } from "antd";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  const containerClasses = clsx(
    "w-full max-w-[1440px] mx-auto px-4 py-5 lg:py-8",
    className
  );

  return (
    <Layout.Content className={containerClasses}>{children}</Layout.Content>
  );
}
