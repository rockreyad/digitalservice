import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar";
import QuickStats from "@/components/overview/QuickStats";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Sidebar />
      <QuickStats />
    </div>
  );
}
