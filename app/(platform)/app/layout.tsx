import { Sidebar } from "@/components/platform/Sidebar";
import { Header } from "@/components/platform/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Sidebar />
      <Header />
      <div className="lg:ml-60 pt-14">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
