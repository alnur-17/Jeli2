import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white dark:bg-[#0A0A0A] overflow-hidden">
      {/* Ghost headline */}
      <span
        className="absolute select-none pointer-events-none font-headline text-[20vw] text-foreground/[0.03] uppercase leading-none"
        aria-hidden
      >
        Jeli
      </span>

      {/* Logo top-left */}
      <div className="absolute top-6 left-6">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <img src="/jeli-logo.svg" alt="Jeli" className="h-6 w-auto dark:brightness-0 dark:invert" />
        </Link>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center px-4 py-24">
        {children}
      </div>
    </div>
  );
}
