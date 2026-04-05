export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar will go here */}
      <aside className="w-64 border-r border-border bg-card hidden lg:block" />
      <main className="flex-1">{children}</main>
    </div>
  );
}
