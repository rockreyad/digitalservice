import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <Sidebar />
      </nav>

      {children}
    </section>
  );
}
