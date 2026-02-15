"use client";

import { AxiosError } from "axios";
import { Ellipsis, Eye, Trash2 } from "lucide-react";
import { ApiError } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import { ActionMenu } from "@/components/ui/action-menu";
import { Icon } from "@/components/ui/icon";
import { useClientsSummary } from "@/hooks/data/clients/use-clients";
import { SCREEN_PATHS } from "@/types/enums/paths";
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
  const router = useRouter();
  const { data: clientsSummaries, isLoading, error } = useClientsSummary();

  const [filters, setFilters] = useState<Filters>({
    searchText: "",
    status: "All Status",
  });

  useEffect(() => {
    if (error) {
      toast.error(getErrorMessage(error as AxiosError<ApiError>));
    }
  }, [error]);

  const filteredClientSummaries = useMemo(() => {
    return clientsSummaries?.data?.filter((summary) => {
      const matchesSearch =
        summary.email
          .toLowerCase()
          .startsWith(filters.searchText.toLowerCase()) ||
        summary.fullName
          .toLowerCase()
          .startsWith(filters.searchText.toLowerCase());

      const matchesStatus =
        !filters.status || filters.status === "All Status"
          ? true
          : summary.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [clientsSummaries, filters]);

  const getProgressPercent = (summary: ClientSummary) => {
    const completed = Number(summary.completedChecklists);
    const total = Number(summary.totalChecklists);

    if (total === 0) return 0;

    return Math.min((completed / total) * 100, 100);
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
            <div>
              <p className="data-table-col-value">{summary.fullName}</p>
              <p className="data-table-col-value-des">{summary.email}</p>
            </div>

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

            <p className={`status ${getStatusClassName(summary.status)}`}>
              <span />
              {formatEnumLabel(summary.status)}
            </p>

            <ActionMenu
              trigger={
                <Icon
                  name={Ellipsis}
                  tone="muted"
                  size={16}
                  containerClassName="ellipsis"
                />
              }
              context={
                <>
                  <Icon
                    text="View Details"
                    name={Eye}
                    onClick={() =>
                      router.push(`${SCREEN_PATHS.CLIENTS}/${summary.id}`)
                    }
                  />
                  <Icon
                    tone="negative"
                    text="Delete"
                    name={Trash2}
                    onClick={() =>
                      router.push(`${SCREEN_PATHS.CLIENTS}/${summary.id}`)
                    }
                  />
                </>
              }
            ></ActionMenu>
          </div>
        ))}
      />
    </section>
  );
};

export default ClientsTable;
