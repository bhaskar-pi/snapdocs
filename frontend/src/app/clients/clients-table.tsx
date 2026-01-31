"use client";

import { ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";

import { DataTable } from "@/components/data-table";
import { Icon } from "@/components/ui/icon";
import { Persona } from "@/components/ui/persona";
import { RequestStatus } from "@/types/enums/request";
import { formatEnumLabel } from "@/utils/input";
import { getStatusClassName } from "@/utils/misc";

import Filter from "./filter";
import styles from "./styles.module.css";

interface Filters {
  searchText: string;
  status: string;
}

const rows = [];

const ClientsTable = () => {
  const [filters, setFilters] = useState<Filters>({
    searchText: "",
    status: "All Status",
  });

  const onChangeFilters = useCallback((prop: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }, []);

  return (
    <section className="section">
      <Filter filters={filters} onChange={onChangeFilters} />

      <DataTable
        columnWidths="1fr 200px 150px 150px 68px"
        emptyText="No clients found"
        emptyDescription="Create document requests for clients and track their progress here."
        isLoading={false}
        count={rows.length}
        columns={
          <>
            <p>Client Name</p>
            <p>Active Requests</p>
            <p>Progress</p>
            <p>Status</p>
            <p />
          </>
        }
        rows={rows?.map((row, i) => (
          <div
            key={i}
            className="data-table-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 200px 150px 150px 68px",
            }}
          >
            <Persona name={row.clientName} subText={row.email} size="sm" />

            <p className={styles.activeRequests}>
              {row.requests} <span>Active</span>
            </p>

            <p className={styles.progress}>{row.progress}</p>

            <p
              className={`status ${getStatusClassName(row.status as RequestStatus)}`}
            >
              {formatEnumLabel(row.status)}
            </p>

            <p className={styles.viewAction}>
              View
              <Icon name={ArrowRight} size={16} tone="primary" />
            </p>
          </div>
        ))}
      />
    </section>
  );
};

export default ClientsTable;
