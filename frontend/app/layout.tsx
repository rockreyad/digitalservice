import "./globals.css";
import { Montserrat } from "next/font/google";
import Sidebar from "@/components/Sidebar";

import ChakraWrapper from "@/components/Chakra";
import QueryClientWrapper from "@/components/QueryClientWrapper";
import Navbar from "@/components/navbar/Navbar";

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ChakraWrapper>
          <QueryClientWrapper>
            <Navbar />
            {children}
          </QueryClientWrapper>
        </ChakraWrapper>
      </body>
    </html>
  );
}
