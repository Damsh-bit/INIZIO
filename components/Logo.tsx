import Image from "next/image";

export default function Logo({ variant = "dark", className = "" }: { variant?: "dark" | "white"; className?: string }) {
  return (
    <Image
      src={variant === "white" ? "/img/logo-white.png" : "/img/logo-dark.png"}
      alt="INIZIO Arquitectura"
      width={659}
      height={90}
      priority
      className={className}
    />
  );
}
