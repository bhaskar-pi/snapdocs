"use client";

import { ChevronRight, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { SIDEBAR_TABS } from "@/config/tabs";
import { useLogout } from "@/hooks/data/auth/use-logout";
import { useAuthStore } from "@/store/auth.store";

import styles from "./app-layout.module.css";

const Sidebar = () => {
  const user = useAuthStore((store) => store.user);
  const logout = useLogout();

  const handleLogout = useCallback(() => {
    logout.mutate();
  }, [logout]);

  const pathName = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <Logo variant="dark" size="md" />
      </div>

      <nav className={styles.nav}>
        {SIDEBAR_TABS.map((tab) => {
          const isActive = tab.isActive(pathName);

          return (
            <Link
              key={tab.id}
              href={tab.path}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <Icon
                name={tab.icon}
                size={15}
                strokeWidth={2}
                className={styles.navIcon}
              />
              <span>{tab.title}</span>

              <Icon
                data-type={isActive ? "active" : ""}
                name={ChevronRight}
                size={18}
                strokeWidth={2}
                containerClassName={`${styles.chevron}`}
              />
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <p
            className={styles.userName}
          >{`${user?.firstName} ${user?.lastName}`}</p>
          <p className={styles.userEmail}>{`${user?.email}`}</p>
        </div>

        <button className={styles.logout} onClick={handleLogout}>
          <Icon
            className={styles.logoutIcon}
            name={LogOut}
            strokeWidth={2}
            size={18}
          />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
