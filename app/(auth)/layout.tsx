import Link from "next/link";

const LogoPlaceholder = () => (
  <div
    style={{ width: 80, height: 32, background: "#E5E5E5", borderRadius: 4 }}
  />
);

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
        <Link href="/">
          <LogoPlaceholder />
        </Link>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center px-4 py-24">
        {children}
      </div>
    </div>
  );
}
