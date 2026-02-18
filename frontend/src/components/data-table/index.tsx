"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useMemo, useState } from "react";

import styles from "./data-table.module.css";
import { EmptyState } from "../ui/empty-state";
import { Icon } from "../ui/icon";
import { ContentLoader } from "../ui/loader/content-loader";

interface Props {
  title: string;
  columns: React.ReactNode;
  rows?: React.ReactNode[];
  columnWidths: string;
  isLoading?: boolean;
  count: number;
  pageSize?: number;
  emptyText?: string;
  emptyDescription?: string;
  onEmptyAction: () => void;
}

export function DataTable({
  title,
  columns,
  rows,
  isLoading = false,
  count,
  pageSize = 10,
  emptyText = "No data found",
  emptyDescription = "",
  columnWidths,
  onEmptyAction,
}: Props) {
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
    return rows?.slice(start, end);
  }, [rows, page, pageSize]);

  return (
    <>
      {!isLoading && count < 1 && (
        <EmptyState
          title={emptyText}
          description={emptyDescription}
          primaryActionLabel={`Create ${title}`}
          onPrimaryAction={onEmptyAction}
          size="md"
        />
      )}

      {(isLoading || (rows && rows?.length > 0)) && (
        <>
          {isLoading && <ContentLoader open />}

          {!isLoading && (
            <div className={styles.table}>
              <div
                className={styles.columns}
                style={{ display: "grid", gridTemplateColumns: columnWidths }}
              >
                {columns}
              </div>

              <div className={styles.rows}>{paginatedRows}</div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <p>
                    Showing {page} of {totalPages} page(s)
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
          )}
        </>
      )}
    </>
  );
}
