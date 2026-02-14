import { Tab } from "@/types/models/tabs";

import styles from "./tabs.module.css";

interface Props {
  tabs: Tab[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, onSelectTab }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div key={tab.id} onClick={() => onSelectTab(tab.name)}>
            <p
              className={`${styles.tab} ${tab.name === activeTab ? styles.isActive : ""}`}
            >
              {tab.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
