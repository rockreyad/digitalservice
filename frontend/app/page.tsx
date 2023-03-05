import Navbar from "@/components/navbar/Navbar";
import FooterAdmin from "@/components/footer/FooterAdmin";

export const metadata = {
  title: "Landing Page of Digital Services",
};

export default function Home() {
  return (
    <>
      <div>
        {/* Top Header */}
        <Navbar />
        <p className="h-screen">
          A Landing page Will be here for Guest , user & admin
        </p>

        {/* Footer */}
        <FooterAdmin />
      </div>
    </>
  );
}
