"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useMemo, useState } from "react";

import styles from "./data-table.module.css";
import { Icon } from "../ui/icon";

interface DataTableProps {
  columns: React.ReactNode;
  rows: React.ReactNode[];
  columnWidths: string;
  isLoading?: boolean;
  count: number;
  pageSize?: number;
  emptyText?: string;
  emptyDescription?: string;
}

export function DataTable({
  columns,
  rows,
  isLoading = false,
  count,
  pageSize = 10,
  emptyText = "No data found",
  emptyDescription = "",
  columnWidths,
}: DataTableProps) {
  const [page, setPage] = useState(1);

  const onPrev = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const onNext = () => {
    setPage((p) => Math.min(totalPages, p + 1));
  };

  const totalPages = Math.ceil((count || 0) / pageSize);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return rows.slice(start, end);
  }, [rows, page, pageSize]);

  return (
    <div data-type="noData" className={styles.table}>
      <div
        style={{ display: "grid", gridTemplateColumns: columnWidths }}
        className={styles.columns}
        data-type="noData"
      >
        {columns}
      </div>

      <div className={styles.rows}>
        {isLoading && <p className={styles.state}>Loading…</p>}

        {!isLoading && <div className={styles.rows}>{paginatedRows}</div>}
      </div>

      {!isLoading && rows.length === 0 && (
        <div className={styles.emptyState}>
          {emptyText && <p className={styles.emptyTitle}>{emptyText}</p>}
          {emptyDescription && (
            <p className={styles.emptyDescription}>{emptyDescription}</p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <p>
            Showing {page} of {totalPages} pages(s)
          </p>

          <div className={styles.paginationActions}>
            <Icon
              containerClassName={styles.iconContainer}
              name={ArrowLeft}
              size={16}
              onClick={onPrev}
              className={page === 1 ? styles.disabled : ""}
            />

            <Icon
              containerClassName={styles.iconContainer}
              name={ArrowRight}
              size={16}
              onClick={onNext}
              className={page === totalPages ? styles.disabled : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}
