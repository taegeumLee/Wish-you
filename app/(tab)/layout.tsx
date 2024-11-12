import Header from "@/components/header";
import TabBar from "@/components/tabBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <main className="mt-14 mb-14">{children}</main>
      <TabBar />
    </div>
  );
}