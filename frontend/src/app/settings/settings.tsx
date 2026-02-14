"use client";

import { useState } from "react";

import Layout from "@/components/layouts/app-layout";
import Tabs from "@/components/tabs";
import PageHeader from "@/components/ui/page-header";
import { SettingsTabs } from "@/config/tabs";
import { SETTINGS_TABS } from "@/types/enums/tabs";

import Profile from "./profile";
import Security from "./security";
import styles from "./settings.module.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<string>(SETTINGS_TABS.PROFILE);

  const renderTabContent = (activeTab: string) => {
    switch (activeTab) {
      case SETTINGS_TABS.PROFILE:
        return <Profile />;
      case SETTINGS_TABS.SECURITY:
        return <Security />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className={styles.settingsContainer}>
        <PageHeader
          header="Settings"
          description="Manage your account and preferences"
        />

        <Tabs
          tabs={SettingsTabs}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {renderTabContent(activeTab)}
      </div>
    </Layout>
  );
};

export default Settings;
