import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar";
import QuickStats from "@/components/overview/QuickStats";
import TotalStats from "@/components/overview/TotalStats";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full p-2">
        <QuickStats />
        <TotalStats /></div>
    </div>
  );
}
