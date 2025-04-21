"use client";

import { Button } from "@components/ui/button";
import { useLogout, useMenu } from "@refinedev/core";
import Link from "next/link";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();

  return (
    <nav className="menu">
      <ul className="flex items-center justify-start md:items-start">
        {menuItems.map((item) => (
          <li className="text-sm" key={item.key}>
            <Button variant="ghost" className="flex gap-1">
              <span>{item?.icon}</span>
              <Link
                href={item.route ?? "/"}
                className={selectedKey === item.key ? "active" : ""}
              >
              {item.label}
            </Link>
            </Button>
          </li>
        ))}
      </ul>
       
      <button className="w-[167px] h-[44px] rounded-[10px] bg-[#fca0a0] text-[#ffffff]" onClick={() => logout()}>Logout</button>
    </nav>
    // <nav className="menu">
    //   <ul>
    //     {menuItems.map((item) => (
    //       <li key={item.key}>
    //         <Link
    //           href={item.route ?? "/"}
    //           className={selectedKey === item.key ? "active" : ""}
    //         >
    //           {item.label}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    //   <button onClick={() => logout()}>Logout</button>
    // </nav>
  );
};
