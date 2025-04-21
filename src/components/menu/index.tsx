"use client";

import { useLogout, useMenu } from "@refinedev/core";
import Link from "next/link";

export const Menu = () => {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.route ?? "/"}
              className={selectedKey === item.key ? "active" : ""}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      
      <button className="w-[167px] h-[44px] rounded-[10px] bg-[#fca0a0] text-[#ffffff]" onClick={() => logout()}>Logout</button>
    </nav>
  );
};
