"use client";

import { DataTable } from "@/components/data-table";
import { DashboardStatus } from "@/types/enums/dashboard";
import { formatCompactDateTime } from "@/utils/date";
import { getDashboardStatusClassName } from "@/utils/misc";

interface Props {
  requests: {
    clientName: string;
    requestTitle: string;
    createdAt: string;
    status: DashboardStatus;
  }[];
}

export function RecentRequestsTable({ requests }: Props) {
  return (
    <DataTable
      title="Request"
      emptyTitle="No document requests yet"
      emptyDescription="Create your first document request to start collecting files from clients."
      count={requests.length}
      pageSize={5}
      columnWidths="1fr 1fr 140px 120px"
      columns={
        <>
          <p>Client</p>
          <p>Request</p>
          <p>Created</p>
          <p>Status</p>
        </>
      }
      rows={requests.map((request) => (
        <div
          key={`${request.clientName}-${request.createdAt}-${request.requestTitle}`}
          className="data-table-row"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 140px 120px",
          }}
        >
          <p className="data-table-primary">{request.clientName}</p>
          <p className="data-table-secondary">{request.requestTitle}</p>
          <p className="data-table-secondary">
            {formatCompactDateTime(request.createdAt)}
          </p>

          <p
            className={`status ${getDashboardStatusClassName(request.status)}`}
          >
            <span />
            {request.status}
          </p>
        </div>
      ))}
    />
  );
}
