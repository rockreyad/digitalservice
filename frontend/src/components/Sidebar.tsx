"use client";
import { BiDoughnutChart } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { BsViewList } from "react-icons/bs";
import { MdPayments, MdOutlinePriceChange } from "react-icons/md";

const sidebarList = [
  {
    name: "Dashboard",
    icon: <BiDoughnutChart className="text-2xl" />,
    URL: "/",
  },
  {
    name: "Orders",
    icon: <AiOutlineBarChart className="text-2xl" />,
    URL: "/profile",
  },
  {
    name: "Client List",
    icon: <BsViewList className="text-2xl" />,
    URL: "/client-list",
  },
  {
    name: "Payment",
    icon: <MdPayments className="text-2xl" />,
    URL: "/payment",
  },
  {
    name: "Profit",
    icon: <MdOutlinePriceChange className="text-2xl" />,
    URL: "/profit",
  },
  {
    name: "Settings",
    icon: <FiSettings className="text-2xl" />,
    URL: "/settings",
  },
];

import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
export default function Sidebar() {
  const menus = [
    { name: "dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "order", link: "/", icon: AiOutlineBarChart },
    {
      name: "client",
      link: "/",
      icon: AiOutlineUser,
      submenu: [
        { name: "client list", link: "/client-list", icon: AiOutlineUser },
        { name: "client Report", link: "/client-list", icon: AiOutlineUser },
      ],
    },
    { name: "Payment", link: "/", icon: MdPayments, margin: true },
    { name: "profit", link: "/", icon: MdOutlinePriceChange },
    { name: "analytics", link: "/", icon: TbReportAnalytics, margin: true },
    { name: "Setting", link: "/", icon: RiSettings4Line, margin: true },
  ];
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState(0);

  return (
    <section className="flex gap-6">
      <div
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <div>
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
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
