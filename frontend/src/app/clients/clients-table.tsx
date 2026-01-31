"use client";

import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { Icon } from "@/components/ui/icon";
import { Persona } from "@/components/ui/persona";
import { useClientsSummary } from "@/hooks/clients/use-clients-summary";
import { RequestStatus } from "@/types/enums/request";
import { ClientSummary } from "@/types/models/client";
import { getErrorMessage } from "@/utils/api";
import { formatEnumLabel } from "@/utils/input";
import { getStatusClassName } from "@/utils/misc";

import Filter from "./filter";
import styles from "./styles.module.css";

interface Filters {
  searchText: string;
  status: string;
}

const ClientsTable = () => {
  const { data: clientsSummaries, isLoading, error } = useClientsSummary();

  const [filters, setFilters] = useState<Filters>({
    searchText: "",
    status: "All Status",
  });

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error));
    }
  }, [error]);

  const filteredClientSummaries = useMemo(() => {
    return clientsSummaries?.filter((summary) => {
      const matchesSearch =
        summary.email
          .toLowerCase()
          .startsWith(filters.searchText.toLowerCase()) ||
        summary.fullName
          .toLowerCase()
          .startsWith(filters.searchText.toLowerCase());

      const matchesStatus =
        filters.status === "All Status" || summary.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [clientsSummaries, filters]);

  const getProgressPercent = (summary: ClientSummary) => {
    const completed = Number(summary.completedChecklists);
    const total = Number(summary.totalChecklists);

    return Math.min((completed / total) * 100, 100) ;
  };

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
        columnWidths="1fr 220px 200px 150px 68px"
        emptyText="No clients found"
        emptyDescription="Create document requests for clients and track their progress here."
        isLoading={isLoading}
        count={filteredClientSummaries?.length || 0}
        columns={
          <>
            <p>Client Name</p>
            <p>Active Requests</p>
            <p>Progress</p>
            <p>Status</p>
            <p />
          </>
        }
        rows={filteredClientSummaries?.map((summary) => (
          <div
            key={summary.id}
            className="data-table-row"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 200px 200px 160px 68px",
            }}
          >
            <Persona name={summary.fullName} subText={summary.email} />

            <p className={styles.activeRequests}>{summary.activeRequests}</p>

            <div className={styles.progressWrapper}>
              <div className={styles.progressBar}>
                <div
                  style={{ width: `${getProgressPercent(summary)}%` }}
                  className={styles.progressFill}
                />
              </div>

              <span className={styles.progressText}>
                {summary.completedChecklists}/{summary.totalChecklists}
              </span>
            </div>

            <p
              className={`status ${getStatusClassName(summary.status as RequestStatus)}`}
            >
              <span />
              {formatEnumLabel(summary.status)}
            </p>

            <p className={styles.viewAction}>
              View
              <Icon name={ArrowRight} size={14} tone="muted" />
            </p>
          </div>
        ))}
      />
    </section>
  );
};

export default ClientsTable;
