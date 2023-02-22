import "./globals.css";
import { Montserrat } from "@next/font/google";
import Sidebar from "@/components/Sidebar";

import ChakraWrapper from "@/components/Chakra";
import QueryClientWrapper from "@/components/QueryClientWrapper";

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
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${montserrat.className}`}>
        <div className="flex">
          <ChakraWrapper>
            <QueryClientWrapper>
              <Sidebar />
              {children}
            </QueryClientWrapper>
          </ChakraWrapper>
        </div>
      </body>
    </html>
  );
}
