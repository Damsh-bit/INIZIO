import Link from "next/link";
import Magnetic from "./Magnetic";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light" | "ghost-light";
  className?: string;
  external?: boolean;
};

const styles = {
  solid: "bg-ink text-paper",
  outline: "border border-ink/30 text-ink",
  light: "bg-paper text-ink",
  "ghost-light": "border border-paper/40 text-paper",
};

const fills = {
  solid: "bg-bronze",
  outline: "bg-ink",
  light: "bg-bronze",
  "ghost-light": "bg-paper",
};

const hoverText = {
  solid: "group-hover:text-paper",
  outline: "group-hover:text-paper",
  light: "group-hover:text-paper",
  "ghost-light": "group-hover:text-ink",
};

export default function Button({ href, children, variant = "solid", className = "", external }: Props) {
  const inner = (
    <span
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-4 text-sm font-medium tracking-wide ${styles[variant]} ${className}`}
      data-cursor="hide"
    >
      <span
        className={`absolute inset-0 translate-y-full rounded-full ${fills[variant]} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0`}
      />
      <span className={`relative z-10 transition-colors duration-500 ${hoverText[variant]}`}>{children}</span>
      <span className={`relative z-10 transition-transform duration-500 group-hover:translate-x-1 ${hoverText[variant]}`}>→</span>
    </span>
  );
  return (
    <Magnetic strength={0.25}>
      {external ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={href}>{inner}</Link>
      )}
    </Magnetic>
  );
}
