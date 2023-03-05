"use client";
import { AiOutlineBarChart } from "react-icons/ai";

import { MdPayments, MdOutlinePriceChange } from "react-icons/md";

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line, RiStackLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";

import Link from "next/link";
import { useSidebar } from "@/contexts/SidebarContext";
export default function Sidebar() {
  //Sidebar Menu
  const menus = [
    { name: "dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "order", link: "/dashboard/order", icon: AiOutlineBarChart },
    {
      name: "user",
      link: "/dashboard/user",
      icon: AiOutlineUser,
      submenu: [
        { name: "client list", link: "/client-list", icon: AiOutlineUser },
        { name: "client Report", link: "/client-list", icon: AiOutlineUser },
      ],
    },
    {
      name: "Payment",
      link: "/dashboard/payment",
      icon: MdPayments,
      margin: true,
    },
    { name: "profit", link: "/dashboard/payment", icon: MdOutlinePriceChange },
    {
      name: "analytics",
      link: "/dashboard/analytics",
      icon: TbReportAnalytics,
      margin: true,
    },
    { name: "service", link: "/dashboard/service", icon: RiStackLine },
    { name: "Setting", link: "/setting", icon: RiSettings4Line, margin: true },
  ];

  //Call the custom hook to use the SidebarContext
  const { toggleSidebar, setToggleSidebar } = useSidebar();

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          toggleSidebar ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className={`py-3 px-3 flex justify-end`}>
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !toggleSidebar && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  toggleSidebar && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
