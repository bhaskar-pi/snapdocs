import { SearchInput } from "@/components/ui/form/search";
import { Select } from "@/components/ui/form/select";
import { RequestStatus } from "@/types/enums/request";
import { mapEnumToOptions } from "@/utils/input";

import styles from "./styles.module.css";

interface Filters {
  searchText: string;
  status: string;
}

interface Props {
  filters: Filters;
  onChange: (prop: string, value: string) => void;
}

const Filter = ({ filters, onChange }: Props) => {
  return (
    <div className={styles.filter}>
      <SearchInput
        value={filters.searchText}
        placeholder="Search by client name or email..."
        id="search"
        fieldClassName="input-width "
        inputClassName="input-height"
        onChange={(e) => onChange("searchText", e.target.value)}
      />
      <Select
        placeholder="All Status"
        value={filters.status}
        id="select-status"
        options={[
          { label: "All Status", value: "" },
          ...mapEnumToOptions(RequestStatus),
        ]}
        inputClassName="input-height"
        onChange={(value) => onChange("status", value)}
      />
    </div>
  );
};

export default Filter;
