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
import { Modal } from "@/components/ui/modal";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  useClientsSummary,
  useDeleteClient,
} from "@/hooks/data/clients/use-clients";
import { SCREEN_PATHS } from "@/types/enums/paths";
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
  const deleteClient = useDeleteClient();
  const isDeleteLoading = deleteClient?.isPaused;

  const [filters, setFilters] = useState<Filters>({
    searchText: "",
    status: "All Status",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<
    | {
        name: string;
        id: string;
      }
    | undefined
  >();

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

  const onChangeFilters = useCallback((prop: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }, []);

  const onOpenDeleteModal = useCallback((name: string, id: string) => {
    setClientToDelete({ name, id });
    setShowDeleteModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setClientToDelete(undefined);
    setShowDeleteModal(false);
  }, []);

  const onDeleteClient = () => {
    if (clientToDelete?.id) {
      deleteClient.mutate(clientToDelete?.id, {
        onSuccess() {
          onCloseModal();
        },
      });
    }

    onCloseModal();
  };

  return (
    <section className="d-flex flex-col gap-6">
      <Filter filters={filters} onChange={onChangeFilters} />

      <DataTable
        title="Document Request"
        onEmptyAction={() => router.push(SCREEN_PATHS.DOCUMENT_REQUESTS)}
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
              <p className="data-table-primary">{summary.fullName}</p>
              <p className="data-table-secondary">{summary.email}</p>
            </div>

            <p className={styles.activeRequests}>{summary.activeRequests}</p>

            <ProgressBar
              completed={summary.completedChecklists}
              total={summary.totalChecklists}
            />

            <p
              className={`status status-${getStatusClassName(summary.status)}`}
            >
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
                      onOpenDeleteModal(summary.fullName, summary.id)
                    }
                  />
                </>
              }
            ></ActionMenu>
          </div>
        ))}
      />

      <Modal
        size="small"
        type="negative"
        open={showDeleteModal}
        onClose={onCloseModal}
        title={`Delete Client`}
        onDelete={{
          label: "Delete",
          onClick: onDeleteClient,
          isLoading: isDeleteLoading,
          disabled: isDeleteLoading || !clientToDelete?.id,
        }}
        onDismiss={{
          label: "Cancel",
          onClick: onCloseModal,
        }}
      >
        <p>
          You are about to permanently delete{" "}
          <strong className="text-primary">{clientToDelete?.name}</strong>.
        </p>

        <p className="mt-2">
          All associated requests and uploaded documents will also be
          permanently removed. This action cannot be undone.
        </p>

        <p className="mt-2">
          <strong>Are you sure you want to continue?</strong>
        </p>
      </Modal>
    </section>
  );
};

export default ClientsTable;
